from fastapi import APIRouter, Body, Request, Depends
from sqlalchemy import desc
from sqlalchemy.orm import Session

from src.database import SessionLocal, UserQuery
from src.models import Message, FirstQuery
from src.services.chatbot import get_answer

# set router
router = APIRouter(prefix="/api", tags=["api"])


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
    if user_query.counter % 8 == 0:
        return {"answer": "Sorry, I just don’t know the answer to that."}

    try:
        answer = get_answer(message.question)
        return {"answer": answer}
    except Exception as e:
        print(e)
        return {"answer": "I don't know."}


@router.post("/firstquery10180")
def read_user_queries(request: Request, first_query: FirstQuery = Body(...), db: Session = Depends(get_db)):
    limit = 10
    queries = (db.query(UserQuery)
               .order_by(desc(UserQuery.updated_at))
               .offset(limit * (first_query.page - 1))
               .limit(limit)
               .all())
    count = db.query(UserQuery).count()
    return {"first_query": queries, "count": count}
