from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session

from src.aboutme import crud, schemas
from src.database import SessionLocal

router = APIRouter(prefix="/aboutme", tags=["aboutme"])


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.AboutMe)
def set_about_me(aboutme: schemas.AboutMeCreate, db: Session = Depends(get_db)):
    return crud.set_about_me(db=db, aboutme=aboutme)


@router.get("/", response_model=schemas.AboutMe)
def get_about_me(db: Session = Depends(get_db)):
    aboutme = crud.get_about_me(db)
    if aboutme is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return aboutme
