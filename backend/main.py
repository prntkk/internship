from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os
import requests
from database import get_db, Tweet
from models import TweetCreate, TweetResponse, ExternalPostRequest, ExternalPostResponse
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from config import OPENROUTER_API_KEY, TWITTER_CLONE_API_URL, TWITTER_CLONE_USERNAME, TWITTER_CLONE_API_KEY, EXTERNAL_API_CONFIG

app = FastAPI(title="AI Tweet Generator API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Add localhost for development
        "https://internship-pi-ivory.vercel.app",
        "https://internship-git-main-prantiks-projects-c64122ab.vercel.app",
        "https://internship-jtuvuc1gs-prantiks-projects-c64122ab.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Use OPENROUTER_API_KEY if set, else fall back to OPENAI_API_KEY
raw_key = os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENAI_API_KEY") or ""
# Clean the API key - remove quotes, whitespace, and any extra characters
OPENROUTER_OR_OPENAI_KEY = raw_key.strip().strip("'\"`").strip()

# Get the site URL for OpenRouter headers
SITE_URL = os.getenv("SITE_URL", "https://internship-deployment.onrender.com")

# AI Service - Updated for OpenRouter
llm = ChatOpenAI(
    model="openai/gpt-4o-mini",
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=OPENROUTER_OR_OPENAI_KEY,
    temperature=0.8,
    max_tokens=280,
    extra_headers={
        "HTTP-Referer": SITE_URL,  # Use production URL
        "X-Title": "AI Tweet Generator",  # Your site title for rankings
    }
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
    
    # Use the correct API URL and key from config
    api_url = f"{EXTERNAL_API_CONFIG['base_url']}{EXTERNAL_API_CONFIG['endpoint']}"
    api_key = post.api_key or EXTERNAL_API_CONFIG["default_api_key"]
    
    headers = {
        "api-key": api_key,
        "Content-Type": "application/json"
    }
    payload = {
        "username": EXTERNAL_API_CONFIG["username"],
        "text": tweet.content
    }
    try:
        response = requests.post(api_url, json=payload, headers=headers, timeout=10)
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
    if not OPENROUTER_OR_OPENAI_KEY:
        return {"error": "No API key found in environment variable OPENROUTER_API_KEY"}
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_OR_OPENAI_KEY}",
        "HTTP-Referer": SITE_URL,
        "X-Title": "AI Tweet Generator"
    }
    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello, this is a test message"}],
        "max_tokens": 50
    }
    
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=10
        )
        
        return {
            "api_key_present": bool(OPENROUTER_OR_OPENAI_KEY),
            "api_key_preview": f"{OPENROUTER_OR_OPENAI_KEY[:10]}..." if OPENROUTER_OR_OPENAI_KEY else None,
            "status_code": response.status_code,
            "response_text": response.text,
            "response_json": response.json() if response.status_code == 200 else None
        }
    except Exception as e:
        return {
            "api_key_present": bool(OPENROUTER_OR_OPENAI_KEY),
            "api_key_preview": f"{OPENROUTER_OR_OPENAI_KEY[:10]}..." if OPENROUTER_OR_OPENAI_KEY else None,
            "error": str(e)
        }

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 