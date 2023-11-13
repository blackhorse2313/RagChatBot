from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# Pydantic models
class BlogBase(BaseModel):
    title: str
    url: str
    content: str
    sub_content: str


# Schema for Blog creation
class BlogCreate(BlogBase):
    pass


# Schema for Blog updates
class BlogUpdate(BlogBase):
    pass


class BlogList(BaseModel):
    id: int
    title: str
    url: str
    sub_content: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]


# Schema for response
class Blog(BlogList, BlogBase):
    id: int

    class Config:
        orm_mode = True
