from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TweetRequest(BaseModel):
    prompt: str

class TweetResponse(BaseModel):
    id: int
    prompt: str
    content: str
    created_at: datetime
    posted_to_clone: bool
    clone_response: Optional[str] = None

    class Config:
        orm_mode = True

class TweetCreate(BaseModel):
    prompt: str

class ExternalPostRequest(BaseModel):
    tweet_id: int
    content: str
    api_key: Optional[str] = None

class ExternalPostResponse(BaseModel):
    success: bool
    message: str
    external_id: Optional[str] = None 