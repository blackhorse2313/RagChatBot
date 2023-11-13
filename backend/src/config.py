import os

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

PINECONE_KEY = os.getenv("PINECONE_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")

INDEX_NAME = "meditermbot-index"

DEFAULT_MESSAGE = "Try, what is the code for revision total knee replacement"
