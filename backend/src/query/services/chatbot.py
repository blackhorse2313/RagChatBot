import pinecone
from langchain.chains import LLMChain
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms.openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Pinecone

from src.config import *


def get_answer(question):
    llm = OpenAI(model_name="gpt-3.5-turbo", temperature=0.0, openai_api_key=OPENAI_API_KEY)

    pinecone.init(
        api_key=PINECONE_KEY,
        environment=PINECONE_ENV
    )

    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

    doclist = Pinecone.from_existing_index(index_name=INDEX_NAME, embedding=embeddings)

    template = """
                docs: {docs} 
                question: {question}
                ###
                Please answer question based on only the docs. If you don't know, say "I don't know."
                If question is about cpt code, follow the below format. 
                “I searched the web. The best answer to your question is CPT code xxxx. Then it should provide the CPT description text."
            """

    prompt = PromptTemplate(
        template=template, input_variables=["docs", "question"]
    )

    llm_chain = LLMChain(prompt=prompt, llm=llm)

    docs = doclist.max_marginal_relevance_search(question, k=3)
    docs = [doc.metadata["answer"] for doc in docs]

    print(docs)

    answer = llm_chain.predict(docs=docs, question=question)
    return answer
