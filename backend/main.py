from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os

# Import with error handling
try:
    from database import get_db, Tweet
    from models import TweetRequest, TweetResponse, TweetCreate
    from ai_service import AIService
except ImportError as e:
    print(f"Import error: {e}")
    print("Please make sure all required files are present in the backend directory")
    raise

app = FastAPI(title="AI Tweet Generator API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI service with error handling
try:
    ai_service = AIService()
    print("✅ AI Service initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize AI Service: {e}")
    print("Please check your OPENROUTER_API_KEY in the .env file")
    ai_service = None

@app.get("/")
def read_root():
    return {"message": "AI Tweet Generator API is running!"}

@app.post("/generate-tweet", response_model=TweetResponse)
def generate_tweet(tweet_request: TweetRequest, db: Session = Depends(get_db)):
    """
    Generate a tweet from a prompt and save it to the database.
    """
    if ai_service is None:
        raise HTTPException(status_code=500, detail="AI service not available")
    
    try:
        # Generate tweet content using AI
        tweet_content = ai_service.generate_tweet(tweet_request.prompt)
        
        # Create tweet record
        db_tweet = Tweet(
            prompt=tweet_request.prompt,
            content=tweet_content
        )
        
        # Save to database
        db.add(db_tweet)
        db.commit()
        db.refresh(db_tweet)
        
        return db_tweet
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error generating tweet: {str(e)}")

@app.get("/tweets", response_model=List[TweetResponse])
def get_tweets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all tweets from the database.
    """
    try:
        tweets = db.query(Tweet).offset(skip).limit(limit).all()
        return tweets
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving tweets: {str(e)}")

@app.delete("/tweets/{tweet_id}")
def delete_tweet(tweet_id: int, db: Session = Depends(get_db)):
    """
    Delete a tweet by its ID.
    """
    try:
        # Find the tweet
        tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
        if not tweet:
            raise HTTPException(status_code=404, detail="Tweet not found")
        
        # Delete the tweet
        db.delete(tweet)
        db.commit()
        
        return {"message": "Tweet deleted successfully", "deleted_id": tweet_id}
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting tweet: {str(e)}")

@app.get("/health")
def health_check():
    """
    Health check endpoint.
    """
    return {
        "status": "healthy", 
        "message": "API is running",
        "ai_service": "available" if ai_service else "unavailable"
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting AI Tweet Generator Backend...")
    print("📍 Backend will be available at: http://localhost:8000")
    print("🌐 Frontend should be running at: http://localhost:3000")
    uvicorn.run(app, host="0.0.0.0", port=8000) 