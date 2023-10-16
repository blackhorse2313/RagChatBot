from dotenv import dotenv_values

# set config with values in env
config = dotenv_values(".env")

OPENAI_API_KEY = config["OPENAI_API_KEY"]

PINECONE_KEY = config["PINECONE_KEY"]
PINECONE_ENV = config["PINECONE_ENV"]

INDEX_NAME = "meditermbot-index"
