from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from src.database import Base
from sqlalchemy.sql import func


class UserQuery(Base):
    __tablename__ = "user_queries"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, index=True)
    query = Column(String, index=True)
    counter = Column(Integer, default=1)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now())
