from datetime import datetime

from pydantic import BaseModel


# Pydantic models

# Schema for response
class AboutMeBase(BaseModel):
    title: str
    content: str


class AboutMeCreate(AboutMeBase):
    pass


class AboutMe(AboutMeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
