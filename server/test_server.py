from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_lowercase():
    response = client.post(
        "/process-text/?lowercase=true",
        json={"text": "Hello WorlD!"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "hello world!"}

def test_punctuation_special_chars():
    response = client.post(
        "/process-text/?punctuation_special_chars=true",
        json={"text": "Hello, world! This is?* an&/|~^+%'\" example- of text preprocessing."}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "Hello world This is an example of text preprocessing"}

def test_stop_words():
    response = client.post(
        "/process-text/?stop_words=true",
        json={"text": "This is a sample sentence and we are going to remove the stopwords from this"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "sample sentence going remove stopwords"}

def test_urls():
    response = client.post(
        "/process-text/?urls=true",
        json={"text": "I hope it will be a useful article for you. Follow me: https://medium.com/@ayselaydin"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "I hope it will be a useful article for you. Follow me: "}

def test_html():
    response = client.post(
        "/process-text/?html=true",
        json={"text": "<html><div><h1>Aysel Aydin</h1><p>Text Preprocessing for NLP</p><a href=\"https://medium.com/@ayselaydin\">Medium account</a></div></html>"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "Aysel AydinText Preprocessing for NLPMedium account"}

def test_multiple_operations():
    response = client.post(
        "/process-text/?lowercase=true&punctuation_special_chars=true&stop_words=true",
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

def test_empty_text():
    response = client.post(
        "/process-text/?lowercase=true",
        json={"text": ""}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": ""}

# Additional tests for new behavior

def test_all_operations():
    response = client.post(
        "/process-text/?lowercase=true&punctuation_special_chars=true&stop_words=true&urls=true&html=true",
        json={"text": "<p>Hello, World! This is an Example. Visit https://example.com</p>"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "hello world example visit"}

def test_mixed_operations():
    response = client.post(
        "/process-text/?lowercase=true&urls=true&html=true",
        json={"text": "<p>Hello, World! Visit https://example.com</p>"}
    )
    assert response.status_code == 200
    assert response.json() == {"processed_text": "hello, world! visit "}
