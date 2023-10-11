import csv
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.document_loaders import UnstructuredFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
import pinecone
import pandas as pd

PINECONE_KEY = "dd3d5f18-d861-4a13-bdf5-261ff6aaba1e"
PINECONE_ENV = "us-central1-gcp"

if __name__ == '__main__':
    # with open('data/data.csv', 'r') as csv_file:
    #     reader = csv.DictReader(csv_file)
    #     sentences = []
    #
    #     for row in reader:
    #         sentences.append('"Code: {}" stands for "Description: {}"'.format(row['Code'], row['Description']))
    #
    # with open('data/data.txt', 'w') as text_file:
    #     for sentence in sentences:
    #         text_file.write(sentence + '\n')

    # loader = UnstructuredFileLoader("data/data.txt")
    # data = loader.load()
    #
    # text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=0)
    # texts = text_splitter.split_documents(data)
    #
    # model_id = 'sentence-transformers/all-MiniLM-L6-v2'
    # model_kwargs = {'device': 'cpu'}
    # hf_embedding = HuggingFaceEmbeddings(
    #     model_name=model_id,
    #     model_kwargs=model_kwargs
    # )
    #
    # # initialize pinecone
    # pinecone.init(
    #     api_key=PINECONE_KEY,
    #     environment=PINECONE_ENV
    # )
    # index_name = "meditermbot-index"
    # namespace = "botdata1"
    #
    # docsearch = Pinecone.from_texts(
    #   [t.page_content for t in texts], hf_embedding,
    #   index_name=index_name, namespace=namespace)

    # loader = CSVLoader(file_path="data/train_data1.csv")
    # data = loader.load()
    df = pd.read_csv('data/train_data1.csv', encoding='utf-8-sig')
    questions = df['Question']
    answers = df['Answer']

    model_id = 'sentence-transformers/all-MiniLM-L6-v2'
    model_kwargs = {'device': 'cpu'}
    hf_embedding = HuggingFaceEmbeddings(
        model_name=model_id,
        model_kwargs=model_kwargs
    )

    # initialize pinecone
    pinecone.init(
        api_key=PINECONE_KEY,
        environment=PINECONE_ENV
    )
    index_name = "meditermbot-index"
    namespace = "medical_code_data"

    Pinecone.from_texts(
        questions, hf_embedding, metadatas=[{"answer": answer} for answer in answers],
        index_name=index_name, namespace=namespace)
