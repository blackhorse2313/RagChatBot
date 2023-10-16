from pydantic import BaseModel


class Message(BaseModel):
    question: str


class FirstQuery(BaseModel):
    page: int
