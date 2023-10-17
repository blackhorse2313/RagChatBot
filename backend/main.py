import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from routes.api import router
from src.database import Base, engine
from src.services.embedding import delete_embedding, add_embedding

# init FastAPI app
app = FastAPI()

origins = [
    "*"
]

app.add_middleware(SessionMiddleware, secret_key="YOUR-SECRET-KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

Base.metadata.create_all(bind=engine)

if __name__ == '__main__':
    uvicorn.run(
        "main:app",
        host='0.0.0.0',
        port=8080,
        log_level="info",
        reload=True
    )
