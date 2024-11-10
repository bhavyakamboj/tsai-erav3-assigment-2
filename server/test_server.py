from fastapi.testclient import TestClient
from server import app  # assuming your FastAPI app is in main.py

client = TestClient(app)

def test_lowercase():
    response = client.post(
        "/process-text/?operations=lowercase",
        json={"text": "Hello WorlD!"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "hello world!"}

def test_punctuation_special_chars():
    response = client.post(
        "/process-text/?operations=punctuation-special-chars",
        json={"text": "Hello, world! This is?* an&/|~^+%'\" example- of text preprocessing."}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "Hello world This is an example of text preprocessing"}

def test_stop_words():
    response = client.post(
        "/process-text/?operations=stop-words",
        json={"text": "This is a sample sentence and we are going to remove the stopwords from this"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "sample sentence going remove stopwords"}

def test_urls():
    response = client.post(
        "/process-text/?operations=urls",
        json={"text": "I hope it will be a useful article for you. Follow me: https://medium.com/@ayselaydin"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "I hope it will be a useful article for you. Follow me: "}

def test_html():
    response = client.post(
        "/process-text/?operations=html",
        json={"text": "<html><div><h1>Aysel Aydin</h1><p>Text Preprocessing for NLP</p><a href=\"https://medium.com/@ayselaydin\">Medium account</a></div></html>"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "Aysel AydinText Preprocessing for NLPMedium account"}

def test_multiple_operations():
    response = client.post(
        "/process-text/?operations=lowercase&operations=punctuation-special-chars&operations=stop-words",
        json={"text": "Hello, World! This is an Example."}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "hello world example"}

def test_no_operations():
    response = client.post(
        "/process-text/",
        json={"text": "Hello, World!"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "Hello, World!"}

def test_invalid_operation():
    response = client.post(
        "/process-text/?operations=invalid_operation",
        json={"text": "Hello, World!"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "Hello, World!"}

def test_empty_text():
    response = client.post(
        "/process-text/?operations=lowercase",
        json={"text": ""}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": ""}
