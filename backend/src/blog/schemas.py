from datetime import datetime

from pydantic import BaseModel


# Pydantic models
class BlogBase(BaseModel):
    title: str
    content: str


# Schema for Blog creation
class BlogCreate(BlogBase):
    pass


# Schema for Blog updates
class BlogUpdate(BlogBase):
    pass


# Schema for response
class Blog(BlogBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
