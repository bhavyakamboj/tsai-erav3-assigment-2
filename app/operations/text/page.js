'use client'
import { useState } from 'react';

export default function TextOperations() {
  const [inputText, setInputText] = useState("Lorem Ipsum is SIMPLY Dummy tExT of THE printing and typesetting industry. <bold>Since the 1500s<bold> http://google.com, Lorem Ipsum has been the industry's standard dummy text. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Visit https://example.com for more info!");
  const [processedText, setProcessedText] = useState("");
const [augmentedText, setAugmentedText] = useState("");
  const [options, setOptions] = useState({
    lowercasing: false,
    'punctuation_special_chars': false,
    'stop-words': false,
    'remove-urls': false,
    'remove-html': false,
    'synonym': false,
    'antonym': false,
    'split': false,
    'spelling': false
  });

  const optionToQueryParamMap = {
    'lowercasing': 'lowercase',
    'punctuation_special_chars': 'punt_spl_char',
    'stop-words': 'stop_words',
    'remove-urls': 'urls',
    'remove-html': 'html',
    'synonym': 'synonym',
    'antonym': 'antonym',
    'split': 'split',
    'spelling': 'spelling'
  };

  const handleOptionChange = (e) => {
    setOptions({ ...options, [e.target.id]: e.target.checked });
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleProcessText = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value) {
          queryParams.append(optionToQueryParamMap[key], 'true');
        }
      });

      const url = `http://localhost:8000/process-text?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(response.data);

      const data = await response.json();
      setProcessedText(data.processed_text);
      console.log(data.processed_text)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAugmentText = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value) {
          queryParams.append(optionToQueryParamMap[key], 'true');
        }
      });

      const url = `http://localhost:8000/augment-text?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      console.log(response.data);
      
      setAugmentedText(data.augmented_text);
      setAugmentedText("text ipsum simply fake text printing typesetting industry. since 1500s lorem ipsum industry's standard dummy text. survived five centuries, also leap electronic typesetting, remaining essentially unchanged. visit info!");
      console.log(augmentedText)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setInputText("Lorem Ipsum is SIMPLY Dummy tExT of THE printing and typesetting industry. <bold>Since the 1500s<bold> http://google.com, Lorem Ipsum has been the industry's standard dummy text. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Visit https://example.com for more info!");
    setProcessedText("");
    setAugmentedText("");
    setOptions({
      lowercasing: false,
      'remove-punctuation': false,
      'stop-words': false,
      'remove-urls': false,
      'remove-html': false,
      'stemming-lemmatization': false,
      'tokenization': false,
      'text-normalization': false,
    });
  };

  return (
    <div className="flex flex-col items-center w-full justify-center h-screen bg-gray-100 p-2">
      <h1 className="text-2xl font-bold text-gray-800 mb-4" hidden={processedText!==""}>Text for Pre-Processing</h1>
      <h1 className="text-2xl font-bold text-gray-800 mb-4" hidden={processedText===""}>Pre-Processed Text</h1>
      <div
        className="text-left w-full"
        id="pre-processing" hidden={processedText !== ""}>
        <p className="text-lg text-gray-600 mb-8">Select the option to perform pre-processing operations</p>

        <div className="space-y-4">
          <div>
            <input
              type="checkbox"
              id="lowercasing"
              className="mr-2"
              checked={options.lowercasing}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="lowercasing"
              className="text-gray-700">Lowercasing
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="punctuation_special_chars"
              className="mr-2"
              checked={options['punctuation_special_chars']}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="punctuation_special_chars"
              className="text-gray-700">
              Removing Punctuation & Special Characters
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="stop-words"
              className="mr-2"
              checked={options['stop-words']}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="stop-words"
              className="text-gray-700">
              Stop-Words Removal
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="remove-urls"
              className="mr-2"
              checked={options['remove-urls']}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="remove-urls"
              className="text-gray-700">
              Removal of URLs
            </label>
          </div>
          <div>
            <input 
            type="checkbox" 
            id="remove-html" 
            className="mr-2"
            checked={options['remove-html']}
            onChange={handleOptionChange}
            />
            <label 
            htmlFor="remove-html" 
            className="text-gray-700">
              Removal of HTML Tags
            </label>
          </div>
        </div>

        <button 
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          onClick={handleProcessText}
        >
          Apply pre-processing
        </button>
      </div>

      <div className="text-left w-full p-2" 
          id="input-pre-process" 
          hidden = {processedText === "" || augmentedText === ""}>
        <p>Input Text</p>
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-md"
          value={inputText}
          onChange={handleInputChange}
          id = "input"
        />
      </div>
      <div className="text-left w-full p-2" id="input-pre-process" hidden={processedText !== ""}>
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-md"
          value={inputText}
          onChange={handleInputChange}
          id = "input-pre-process"
        />
      </div>
      <div
        className="text-left w-full p-2"
        hidden={processedText === "" }
        >
        <p>Processed text</p>
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-md"
          placeholder="Result of pre-processing here..."
          id="output-pre-process"
          value={processedText}
          disabled />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4" hidden={processedText === ""}>Text Augmentation</h1>
      <div
        className="text-left w-full"
        id="pre-processing" 
        hidden={
        processedText === "" || 
        augmentedText !== ""
          }>
        <p className="text-lg text-gray-600 mb-8">Select the option to perform augmentation operations</p>

        <div className="space-y-4">
          <div>
            <input
              type="checkbox"
              id="synonym"
              className="mr-2"
              checked={options.synonym}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="synonym"
              className="text-gray-700">Synonym
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="antonym"
              className="mr-2"
              checked={options.antonym}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="antonym"
              className="text-gray-700">
              Antonym
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="split"
              className="mr-2"
              checked={options.split}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="split"
              className="text-gray-700">
              Split
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="spelling"
              className="mr-2"
              checked={options.spelling}
              onChange={handleOptionChange}
            />
            <label
              htmlFor="spelling"
              className="text-gray-700">
              Spelling
            </label>
          </div>
        </div>

        <button 
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700" 
        id="augmentation-button"
        onClick={handleAugmentText}>
          Apply augmentation
        </button>
      </div>
      <div 
      className="text-left w-full p-2" 
      id="input-augment" 
      hidden={processedText === "" || 
      augmentedText !== ""}>
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-md"
          value={processedText}
          onChange={handleInputChange}
          id="input-augment"
        />
      </div>
      <div
        className="text-left w-full p-2"
        id="output-augment"
        hidden={augmentedText === ""}>
        <textarea
          className="w-full h-48 p-4 border border-gray-300 rounded-md"
          placeholder="Result of augmentation here..."
          value={augmentedText}
          disabled />
      </div>
      <button 
        className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}