import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.staticfiles import StaticFiles

from routes.api import router
from src.database import Base, engine

# init FastAPI app
app = FastAPI()

app.mount("/api/images", StaticFiles(directory="images"), name="images")

origins = [
    "https://medicalcodingbot.com",  # Ensure you've listed the correct origins
    "http://localhost:3000",  # Add the port number if you have a specific one in the development phase
]

app.add_middleware(SessionMiddleware, secret_key="medical_coding_bot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]  # Reveal the allowed headers
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
