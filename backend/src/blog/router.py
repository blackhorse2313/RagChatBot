import shutil

from fastapi import Depends, HTTPException, APIRouter, UploadFile, File
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

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


@router.get("/", response_model=list[schemas.BlogList])
def read_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    db_blogs = crud.get_blogs(db, skip=skip, limit=limit)
    blogs = [schemas.BlogList(id=blog.id, title=blog.title, url=blog.url, sub_content=blog.sub_content,
                              created_at=blog.created_at, updated_at=blog.updated_at) for blog in db_blogs]
    return blogs


@router.get("/{blog_url}", response_model=schemas.Blog)
def read_blog(blog_url: str, db: Session = Depends(get_db)):
    db_blog = crud.get_blog(db, blog_url=blog_url)
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


@router.post("/upload")
async def upload_image(image: UploadFile = File(...)):
    with open(f"images/{image.filename}", "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return JSONResponse(content={"imageUrl": f"images/{image.filename}"})
