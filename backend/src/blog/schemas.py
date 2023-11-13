from datetime import datetime

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
    created_at: datetime
    updated_at: datetime


# Schema for response
class Blog(BlogBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
