import xml.etree.ElementTree as ET
from typing import List

from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from fastapi.responses import Response

from src.blog import crud, schemas
from src.database import SessionLocal

# set router
router = APIRouter(prefix="/sitemap", tags=["sitemap"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/sitemap.xml", response_class=Response)
def send_message(request: Request, db: Session = Depends(get_db)):
    blogs: List[schemas.Blog] = crud.get_blogs(db)

    # Create the sitemap
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    # Add static URLs
    static_urls = ["https://medicalcodingbot.com/", "https://medicalcodingbot.com/chatbot",
                   "https://medicalcodingbot.com/aboutme", "https://medicalcodingbot.com/blog"]
    for static_url in static_urls:
        url = ET.SubElement(urlset, "url")
        ET.SubElement(url, "loc").text = static_url

    for blog in blogs:
        url = ET.SubElement(urlset, "url")
        ET.SubElement(url, "loc").text = f"https://medicalcodingbot.com/blog/{blog.url}"
        ET.SubElement(url, "lastmod").text = blog.updated_at.strftime("%Y-%m-%d")

    # Convert the sitemap to a string
    sitemap = ET.tostring(urlset, encoding="unicode")

    return Response(content=sitemap, media_type="application/xml")