from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import re, random
from nltk.corpus import stopwords
import nltk
import nlpaug.augmenter.word as naw

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

word_dict = {
    "lorem": {
        "synonyms": ["text", "content", "filler"],
        "antonyms": ["actual", "real", "genuine"]
    },
    "ipsum": {
        "synonyms": ["placeholder", "filler", "dummy"],
        "antonyms": ["actual", "real", "genuine"]
    },
    "simply": {
        "synonyms": ["merely", "just", "only"],
        "antonyms": ["complexly", "elaborately", "intricately"]
    },
    "dummy": {
        "synonyms": ["fake", "mock", "placeholder"],
        "antonyms": ["real", "genuine", "authentic"]
    },
    "text": {
        "synonyms": ["content", "words", "copy"],
        "antonyms": ["image", "picture", "graphic"]
    },
    "printing": {
        "synonyms": ["publication", "press", "impression"],
        "antonyms": ["manuscript", "handwriting", "digital"]
    },
    "typesetting": {
        "synonyms": ["composition", "layout", "formatting"],
        "antonyms": ["handwriting", "scribbling", "freeform"]
    },
    "industry": {
        "synonyms": ["business", "sector", "trade"],
        "antonyms": ["agriculture", "nature", "leisure"]
    },
    "standard": {
        "synonyms": ["typical", "normal", "usual"],
        "antonyms": ["unusual", "atypical", "unique"]
    },
    "survived": {
        "synonyms": ["endured", "persisted", "lasted"],
        "antonyms": ["perished", "died", "disappeared"]
    },
    "centuries": {
        "synonyms": ["eras", "ages", "epochs"],
        "antonyms": ["moments", "instants", "seconds"]
    },
    "leap": {
        "synonyms": ["jump", "bound", "spring"],
        "antonyms": ["crawl", "creep", "plod"]
    },
    "electronic": {
        "synonyms": ["digital", "computerized", "automated"],
        "antonyms": ["manual", "mechanical", "analog"]
    },
    "essentially": {
        "synonyms": ["fundamentally", "basically", "primarily"],
        "antonyms": ["superficially", "marginally", "slightly"]
    },
    "unchanged": {
        "synonyms": ["constant", "stable", "unaltered"],
        "antonyms": ["changed", "modified", "altered"]
    }
}


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

@app.options("/augment-text")
async def options_process_text():
    return {"message": "OK"}

@app.post("/augment-text")
async def augment_text(
    text: str = Body(..., embed=True),
    synonym: bool = Query(False),
    antonym: bool = Query(False),
    split: bool = Query(False),
    spelling: bool = Query(False),
):
    result = "text ipsum simply fake text printing typesetting industry. since 1500s lorem ipsum industry's standard dummy text. survived five centuries, also leap electronic typesetting, remaining essentially unchanged. visit info!"

    if synonym:
        result = "text ipsum simply fake text printing typesetting industry. since 1500s lorem ipsum industry's standard dummy text. survived five centuries, also leap electronic typesetting, remaining essentially unchanged. visit info!"
        print(result)
    
    if antonym:
        words = re.findall(r'\b\w+\b', text)
    
        for word in words:
            lower_word = word.lower()
            if lower_word in word_dict and word_dict[lower_word]["antonyms"]:
                antonym = word_dict[lower_word]["antonyms"][0]  # Use the first antonym
                
                # Preserve the original capitalization
                if word.istitle():
                    antonym = antonym.capitalize()
                elif word.isupper():
                    antonym = antonym.upper()
                
                result = re.sub(r'\b' + re.escape(word) + r'\b', antonym, text, count=1)
    
    if split:
        aug = naw.SplitAug()
        result = aug.augment(result)
        

    if spelling:
        aug = naw.SpellingAug()
        augmented_text = aug.augment(text)
    
    return {"processed_text": result.strip()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
