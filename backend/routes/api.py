from fastapi import APIRouter

from src.query.router import router as query_router
from src.blog.router import router as blog_router
from src.aboutme.router import router as about_me_router

router = APIRouter(prefix="/api", tags=["api"])
router.include_router(query_router)
router.include_router(blog_router)
router.include_router(about_me_router)
