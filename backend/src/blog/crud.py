from datetime import datetime

from sqlalchemy import desc
from sqlalchemy.orm import Session

from src.blog import models, schemas
from src.sitemap.router import update_sitemap


def get_blog(db: Session, blog_url: str):
    return db.query(models.Blog).filter(models.Blog.url == blog_url).first()


def get_blogs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Blog).order_by(desc(models.Blog.updated_at)).offset(skip).limit(limit).all()


def create_blog(db: Session, blog: schemas.BlogCreate):
    db_blog = models.Blog(title=blog.title, content=blog.content, url=blog.url)
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)

    update_sitemap(db)
    return db_blog


def delete_blog(db: Session, blog_id: int):
    db_blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    db.delete(db_blog)
    db.commit()

    update_sitemap(db)
    return db_blog


def update_blog(db: Session, blog_id: int, blog: schemas.BlogUpdate):
    db_blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    db_blog.title = blog.title
    db_blog.url = blog.url
    db_blog.content = blog.content
    db.commit()
    db.refresh(db_blog)

    update_sitemap(db)
    return db_blog
