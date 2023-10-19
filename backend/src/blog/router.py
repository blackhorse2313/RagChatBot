from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session

from src.blog import crud, schemas
from src.database import SessionLocal

router = APIRouter(prefix="/blogs", tags=["blog"])


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.Blog)
def create_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    return crud.create_blog(db=db, blog=blog)


@router.get("/", response_model=list[schemas.Blog])
def read_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    blogs = crud.get_blogs(db, skip=skip, limit=limit)
    return blogs


@router.get("/{blog_id}", response_model=schemas.Blog)
def read_blog(blog_id: int, db: Session = Depends(get_db)):
    db_blog = crud.get_blog(db, blog_id=blog_id)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog


@router.put("/{blog_id}", response_model=schemas.Blog)
def update_blog(blog_id: int, blog: schemas.BlogUpdate, db: Session = Depends(get_db)):
    db_blog = crud.update_blog(db, blog_id=blog_id, blog=blog)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog


@router.delete("/{blog_id}", response_model=schemas.Blog)
def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    db_blog = crud.delete_blog(db, blog_id=blog_id)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog
