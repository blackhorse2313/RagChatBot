from uuid import uuid4

import pandas as pd
import pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone

from src.config import *

# initialize embedding
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

# initialize pinecone
pinecone.init(
    api_key=PINECONE_KEY,
    environment=PINECONE_ENV
)

index = pinecone.Index(INDEX_NAME)


def start_embedding():
    # read csv file
    df = pd.read_csv('data/train_data.csv', encoding='utf-8-sig')
    questions = df['Question']
    answers = df['Answer']

    Pinecone.from_texts(
        questions, embeddings, metadatas=[{"answer": answer} for answer in answers],
        index_name=INDEX_NAME)


def add_embedding(question: str, answer: str):
    embed_question = embeddings.embed_query(question)
    id = str(uuid4())
    print(id)
    upsert_response = index.upsert(
        vectors=[
            {
                'id': id,
                'values': embed_question,
                'metadata': {'answer': answer, 'text': question}
            }
        ]
    )
    return upsert_response


def delete_embedding(ids: list[str]):
    index.delete(ids=ids)
