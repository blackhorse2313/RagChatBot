from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from src.database import Base


class AboutMe(Base):
    __tablename__ = "aboutme"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())
