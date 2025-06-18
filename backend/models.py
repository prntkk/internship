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

    class Config:
        from_attributes = True

class TweetCreate(BaseModel):
    prompt: str
    content: str 