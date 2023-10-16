import random
import uuid

from fastapi import APIRouter, Body, Request, Depends
from sqlalchemy.orm import Session

from src.database import SessionLocal, UserQuery
from src.models import Message, FirstQuery
from src.services.chatbot import get_answer
from sqlalchemy import desc

# set router
router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/send")
def send_message(request: Request, message: Message = Body(...), db: Session = Depends(get_db)):
    device_id = request.headers.get('X-Device-Id')

    # check if this is the user's first query
    user_query = db.query(UserQuery).filter(UserQuery.device_id == device_id).first()

    if user_query is None:
        # this is the user's first query, save it
        user_query = UserQuery(query=message.question, device_id=device_id)
        db.add(user_query)
    else:
        # this is not the user's first query, increment the counter
        user_query.counter += 1

    db.commit()

    # randomly return "I don't know" approximately every 8 messages
    if random.randint(1, 8) == 1:
        user_query.counter = 0
        return {"answer": "Sorry, I just don’t know the answer to that."}

    answer = get_answer(message.question)
    return {"answer": answer}


@router.post("/firstquery10180")
def read_user_queries(request: Request, first_query: FirstQuery = Body(...), db: Session = Depends(get_db)):
    queries = (db.query(UserQuery)
               .order_by(desc(UserQuery.updated_at))
               .offset(10 * (first_query.page - 1))
               .limit(10)
               .all())
    count = db.query(UserQuery).count()
    return {"first_query": queries, "count": count}
