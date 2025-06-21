from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os
import requests
from backend.database import get_db, Tweet
from backend.models import TweetCreate, TweetResponse, ExternalPostRequest, ExternalPostResponse
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from backend.config import OPENROUTER_API_KEY, TWITTER_CLONE_API_URL, TWITTER_CLONE_USERNAME, TWITTER_CLONE_API_KEY

app = FastAPI(title="AI Tweet Generator API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://internship-pi-ivory.vercel.app",
        "https://internship-git-main-prantiks-projects-c64122ab.vercel.app",
        "https://internship-jtuvuc1gs-prantiks-projects-c64122ab.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Use OPENROUTER_API_KEY if set, else fall back to OPENAI_API_KEY
OPENROUTER_OR_OPENAI_KEY = os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENAI_API_KEY")
print("OPENROUTER_API_KEY:", os.getenv("OPENROUTER_API_KEY"))
print("OPENAI_API_KEY:", os.getenv("OPENAI_API_KEY"))
print("Using key:", OPENROUTER_OR_OPENAI_KEY)

# AI Service
llm = ChatOpenAI(
    model="openai/gpt-3.5-turbo",
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=OPENROUTER_OR_OPENAI_KEY,
    temperature=0.8,
    max_tokens=280
)

tweet_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a creative tweet generator. Write a tweet under 280 chars, engaging, with hashtags if appropriate."),
    ("human", "Create an engaging tweet about: {prompt}")
])

@app.post("/generate-tweet", response_model=TweetResponse)
def generate_tweet(data: TweetCreate, db: Session = Depends(get_db)):
    if not OPENROUTER_OR_OPENAI_KEY:
        print("No OpenRouter/OpenAI API key found!")
        raise HTTPException(status_code=500, detail="AI service not available (missing API key)")
    try:
        chain = tweet_prompt | llm
        result = chain.invoke({"prompt": data.prompt})
        tweet_content = result.content.strip()
        db_tweet = Tweet(
            prompt=data.prompt,
            content=tweet_content
        )
        db.add(db_tweet)
        db.commit()
        db.refresh(db_tweet)
        return db_tweet
    except Exception as e:
        db.rollback()
        print("Error in /generate-tweet:", str(e))
        raise HTTPException(status_code=500, detail=f"Error generating tweet: {str(e)}")

@app.get("/tweets", response_model=List[TweetResponse])
def get_tweets(db: Session = Depends(get_db)):
    tweets = db.query(Tweet).order_by(Tweet.created_at.desc()).all()
    return tweets

@app.post("/post-to-external", response_model=ExternalPostResponse)
def post_to_external(post: ExternalPostRequest, db: Session = Depends(get_db)):
    tweet = db.query(Tweet).filter(Tweet.id == post.tweet_id).first()
    if not tweet:
        raise HTTPException(status_code=404, detail="Tweet not found")
    # Allow editing before posting
    tweet.content = post.content
    headers = {
        "api-key": post.api_key or TWITTER_CLONE_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "username": TWITTER_CLONE_USERNAME,
        "text": tweet.content
    }
    try:
        response = requests.post(TWITTER_CLONE_API_URL, json=payload, headers=headers, timeout=10)
        tweet.posted_to_clone = response.status_code == 200
        tweet.clone_response = response.text
        db.commit()
        if response.status_code == 200:
            return ExternalPostResponse(success=True, message="Tweet posted successfully to Twitter Clone")
        else:
            return ExternalPostResponse(success=False, message=f"Failed: {response.status_code} - {response.text}")
    except Exception as e:
        db.rollback()
        return ExternalPostResponse(success=False, message=f"Error: {str(e)}")

@app.get("/health")
def health():
    return {"status": "ok"}

router = APIRouter()

@router.get("/test-openrouter")
def test_openrouter():
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        return {"error": "No API key found in environment variable OPENROUTER_API_KEY"}
    headers = {"Authorization": f"Bearer {api_key}"}
    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello"}]
    }
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=data
    )
    return {
        "api_key": repr(api_key),
        "status_code": response.status_code,
        "response": response.text
    }

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 