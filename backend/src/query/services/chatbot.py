import pinecone
from langchain.chains import LLMChain
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms.openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Pinecone

from src.config import *


def get_answer(user_input):
    llm = OpenAI(api_key=OPENAI_API_KEY)

    pinecone.init(
        api_key=PINECONE_KEY,
        environment=PINECONE_ENV
    )

    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

    doclist = Pinecone.from_existing_index(index_name=INDEX_NAME, embedding=embeddings)

    template = """
                docs: {docs} 
                user_input: {user_input}
                
                ###
                Give me the best answer about user_input based on only the docs.
                Please don't say non-necessary sentence like "The best answer based on the given docs is .."
                If you don't know, say "I don't know.". 
                In case that you don't know and user_input is "hi" or "hello", say "I'm here to help with your coding needs"
                If question is about cpt code, follow the below format. 
                “I searched the web. The best answer to your question is CPT code xxxx. Then it should provide the CPT description text."
            """

    prompt = PromptTemplate(
        template=template, input_variables=["docs", "user_input"]
    )

    llm_chain = LLMChain(prompt=prompt, llm=llm)

    docs = doclist.max_marginal_relevance_search(user_input, k=3)
    docs = [doc.metadata["answer"] for doc in docs]

    print(docs)

    answer = llm_chain.predict(docs=docs, user_input=user_input)
    return answer
