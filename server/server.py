from fastapi import FastAPI, Query, Body
from typing import List
import re
from nltk.corpus import stopwords
import nltk

app = FastAPI()

# Download NLTK stopwords
nltk.download('stopwords', quiet=True)

@app.post("/process-text/")
async def process_text(
    text: str = Body(..., embed=True),
    operations: List[str] = Query(None)
):
    result = text

    if operations:
        for operation in operations:
            if operation == "lowercase":
                result = result.lower()
            elif operation == "punctuation-special-chars":
                punctuation_pattern = r'[^\w\s]'
                result = re.sub(punctuation_pattern, '', result)
            elif operation == "stop-words":
                stop_words = set(stopwords.words('english'))
                word_tokens = result.split()
                result = ' '.join([word for word in word_tokens if word.lower() not in stop_words])
            elif operation == "urls":
                url_pattern = re.compile(r'https?://\S+|www\.\S+')
                result = url_pattern.sub(r'', result)
            elif operation == "html":
                html_tags_pattern = r'<.*?>'
                result = re.sub(html_tags_pattern, '', result)

    return {"processed_text": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
