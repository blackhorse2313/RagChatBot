from datetime import datetime

from sqlalchemy.orm import Session

from src.aboutme import models, schemas


def get_about_me(db: Session):
    return db.query(models.AboutMe).first()


def set_about_me(db: Session, aboutme: schemas.AboutMeCreate):
    db_aboutme = db.query(models.AboutMe).first()

    if db_aboutme is not None:
        db_aboutme.title = aboutme.title
        db_aboutme.content = aboutme.content
        db_aboutme.updated_at = datetime.now()
    else:
        db_aboutme = models.AboutMe(title=aboutme.title, content=aboutme.content)
        db.add(db_aboutme)

    db.commit()
    db.refresh(db_aboutme)
    return db_aboutme
