import pandas as pd
import pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone

from src.config import *


def start_embedding():
    # read csv file
    df = pd.read_csv('data/train_data.csv', encoding='utf-8-sig')
    questions = df['Question']
    answers = df['Answer']

    # initialize embedding
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

    # initialize pinecone
    pinecone.init(
        api_key=PINECONE_KEY,
        environment=PINECONE_ENV
    )

    Pinecone.from_texts(
        questions, embeddings, metadatas=[{"answer": answer} for answer in answers],
        index_name=INDEX_NAME)
