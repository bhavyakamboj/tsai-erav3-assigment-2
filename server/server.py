from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import re
from nltk.corpus import stopwords
import nltk

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Download NLTK stopwords
nltk.download('stopwords', quiet=True)

@app.options("/process-text")
async def options_process_text():
    return {"message": "OK"}

@app.post("/process-text")
async def process_text(
    text: str = Body(..., embed=True),
    lowercase: bool = Query(False),
    punct_spl_char: bool = Query(False),
    stop_words: bool = Query(False),
    urls: bool = Query(False),
    html: bool = Query(False)
):
    result = text

    if lowercase:
        result = result.lower()
    
    if html:
        html_tags_pattern = r'<.*?>'
        result = re.sub(html_tags_pattern, '', result)

    if urls:
        url_pattern = re.compile(r'https?://\S+|www\.\S+')
        result = url_pattern.sub(r'', result)

    if punct_spl_char:
        punctuation_pattern = r'[^\w\s]'
        result = re.sub(punctuation_pattern, '', result)
    
    if stop_words:
        stop_words_set = set(stopwords.words('english'))
        word_tokens = result.split()
        result = ' '.join([word for word in word_tokens if word.lower() not in stop_words_set]).strip()

    return {"processed_text": result.strip()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
