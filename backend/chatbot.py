import pinecone
import time
import os
from langchain import hub
from langchain.llms import Replicate
from langchain.vectorstores import Pinecone
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from langchain.llms import GPT4All
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
import argparse
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

PINECONE_KEY = "dd3d5f18-d861-4a13-bdf5-261ff6aaba1e"
PINECONE_ENV = "us-central1-gcp"

os.environ["REPLICATE_API_TOKEN"] = "r8_MkjRj8SR0RhhIb8yJ0WiDe9tK8ozp2k1K1QGd"


def getReply():
    llm = Replicate(
        model="meta/llama-2-13b-chat:f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d",
        model_kwargs={"temperature": 0.01, "max_length": 500, "top_p": 1},
    )

    while True:
        pinecone.init(
            api_key=PINECONE_KEY,
            environment=PINECONE_ENV
        )
        index_name = "meditermbot-index"
        namespace = "medical_code_data"

        model_id = 'sentence-transformers/all-MiniLM-L6-v2'
        model_kwargs = {'device': 'cpu'}
        hf_embedding = HuggingFaceEmbeddings(
            model_name=model_id,
            model_kwargs=model_kwargs
        )

        doclist = Pinecone.from_existing_index(index_name=index_name, embedding=hf_embedding, namespace=namespace)

        template = """
            {docs}
            
            ###
            Please answer the following questions based solely on the above info. 
            Never make up the answer. If you don’t know, say you don’t know.
            When responds with a CPT code, it should say, “I searched the web. The best answer to your question is CPT code xxxx. Then it should provide the CPT description text."
            When responds with a ICD10 code, it should say without any given format.
            Just answer the question. No more unnecessary details.
            question: {question}
        """
        prompt = PromptTemplate(
            template=template, input_variables=["docs", "question"]
        )

        llm_chain = LLMChain(prompt=prompt, llm=llm)

        question = input("\nEnter a query: ")
        start = time.time()
        docs = doclist.max_marginal_relevance_search(question, k=10, namespace=namespace)
        docs = [doc.metadata["answer"] for doc in docs]
        answer = llm_chain.predict(docs=docs, question=question)
        print(answer)
        end = time.time()
        print("Elapsed Time:" + str(end - start))


if __name__ == "__main__":
    getReply()
