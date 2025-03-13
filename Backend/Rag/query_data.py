# import argparse
# from langchain_community.vectorstores import Chroma
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.llms.ollama import Ollama
# from langchain_community.embeddings.ollama import OllamaEmbeddings
# import os

# CHROMA_PATH = "c:/temp/chroma"  # Ensure this directory is writeable.

# PROMPT_TEMPLATE = """
# Answer the question based only on the following context:

# {context}

# ---

# Answer the question based on the above context: {question}
# """


# def main():
#     # Create CLI.
#     parser = argparse.ArgumentParser()
#     parser.add_argument("query_text", type=str, help="The query text.")
#     args = parser.parse_args()
#     query_text = args.query_text
#     query_rag(query_text)


# def query_rag(query_text: str):
#     # Prepare the DB.
#     def get_embedding_function():
#         print("🧠 Initializing embedding function...")
#         embeddings = OllamaEmbeddings(model="nomic-embed-text")
#         return embeddings

#     # Ensure CHROMA_PATH is valid.
#     if not os.path.exists(CHROMA_PATH):
#         os.makedirs(CHROMA_PATH)

#     embedding_function = get_embedding_function()
#     db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

#     # Search the DB.
#     results = db.similarity_search_with_score(query_text, k=5)

#     context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
#     prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
#     prompt = prompt_template.format(context=context_text, question=query_text)

#     model = Ollama(model="mistral", host="http://localhost", port=3000, device="cpu")
#     response_text = model.invoke(prompt)

#     sources = [doc.metadata.get("id", None) for doc, _score in results]
#     formatted_response = f"Response: {response_text}\nSources: {sources}"
#     print(formatted_response)
#     return response_text


# if __name__ == "__main__":
#     main()

# import argparse
# from langchain_community.vectorstores.chroma import Chroma  # Updated import to fix deprecation warning
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.llms.ollama import Ollama
# from langchain_community.embeddings.ollama import OllamaEmbeddings

# CHROMA_PATH = "C:/Users/bhara/project/Mechanic-Chatbot/Backend/Rag/chroma"

# PROMPT_TEMPLATE = """
# Answer the question based only on the following context:

# {context}

# ---

# Answer the question based on the above context: {question}
# """

import argparse
from langchain_chroma import Chroma
from langchain_community.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM  # Updated import
from langchain_ollama.embeddings import OllamaEmbeddings

CHROMA_PATH = "C:/Users/SAMUD/OneDrive/Desktop/CarChatbot/Backend/Rag/chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""

def main():
    parser = argparse.ArgumentParser(description="Query the RAG system with a given text.")
    parser.add_argument("query_text", type=str, help="The query text to process.")
    parser.add_argument("--k", type=int, default=5, help="Number of top results to return. Default is 5.")
    parser.add_argument("--model", type=str, default="mistral", help="Ollama model to use. Default is 'mistral'.")
    args = parser.parse_args()

    query_text = args.query_text
    k = args.k
    model_name = args.model

    query_rag(query_text, k, model_name)

def query_rag(query_text: str, k: int, model_name: str):
    def get_embedding_function():
        print("🧠 Initializing embedding function...")
        return OllamaEmbeddings(model="nomic-embed-text")

    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    print(f"🔍 Searching for top {k} results...")
    results = db.similarity_search_with_score(query_text, k=k)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _ in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    print(f"🗣 Using model '{model_name}' to generate response...")
    model = OllamaLLM(model=model_name)  # Updated usage without host, port, or device
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", "Unknown") for doc, _ in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)
    return response_text

if __name__ == "__main__":
    main()