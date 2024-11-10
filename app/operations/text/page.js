import { redirect } from 'next/navigation';

export default function TextOperations() {

    // Hero section
    // return (
    //     <div className="flex items-center justify-center h-screen bg-gray-100">
    //         <div className="text-center">
    //             <h1 className="text-4xl font-bold text-gray-800 mb-4">Text Pre-Processing</h1>
    //             <p className="text-lg text-gray-600 mb-8">Select the option to perform pre-processing operations</p>
                
    //             <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
    //                 Get Started
    //             </button>
    //         </div>

    //     </div>
    // );
    const defaultText = " \
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Since the 1500s, Lorem Ipsum has been the industry's standard dummy text. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Visit https://example.com for more info! \
The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. <b>This is bold text.</b> HTML tags like \<a href=\"https:\/\/google.com\">links</a> should be removed. Stop words such as \"and\", \"the\",, \"should\", \"now\" are common. \
Running, runs, and ran are forms of the word \"run\". Similarly, swimming, swims, and swam are forms of the word \"swim\". The process of stemming and lemmatization will help in reducing these words to their base forms. Tokenization will break this text into individual words or tokens, which is essential for further processing. \
Consider the following: \"Hello, World!\" is a common phrase used in programming. It includes punctuation and special characters that need to be removed. Additionally, URLs like https://another-example.org and email addresses such as example@example.com should be filtered out. \
Normalization involves converting text to a standard format. This includes converting all text to lowercase, removing diacritics, and ensuring consistent spacing. For instance, the phrase \"Café\" should be normalized to \"cafe\". \
In the world of Natural Language Processing (NLP), these operations are crucial for preparing text data for analysis. They help in cleaning and structuring the data, making it suitable for machine learning models. \
Consider a scenario where you have a dataset of customer reviews. These reviews may contain a mix of uppercase and lowercase letters, punctuation, URLs, and HTML tags. By applying the operations mentioned above, youcan transform the raw text into a clean and structured format. This will enable you to perform sentiment analysis, topic modeling, or any other text-based analysis effectively. \
In conclusion, text pre-processing is a vital step in the data preparation pipeline. It ensures that the text data is in a consistent and usable format, allowing for accurate and meaningful analysis. Whether you are working with social media data, customer reviews, or any other form of text data, these operations will help you extract valuable insights and make informed decisions.";

    return (
      <div className="flex items-center w-fulljustify-center h-screen bg-gray-100 p-2">
          <div className="text-left w-full">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Text Pre-Processing</h1>
              <p className="text-lg text-gray-600 mb-8">Select the option to perform pre-processing operations</p>
              
              <div className="space-y-4">
                  <div>
                      <input type="checkbox" id="lowercasing" className="mr-2" />
                      <label htmlFor="lowercasing" className="text-gray-700">Lowercasing</label>
                  </div>
                  <div>
                      <input type="checkbox" id="remove-punctuation" className="mr-2" />
                      <label htmlFor="remove-punctuation" className="text-gray-700">Removing Punctuation & Special Characters</label>
                  </div>
                  <div>
                      <input type="checkbox" id="stop-words" className="mr-2" />
                      <label htmlFor="stop-words" className="text-gray-700">Stop-Words Removal</label>
                  </div>
                  <div>
                      <input type="checkbox" id="remove-urls" className="mr-2" />
                      <label htmlFor="remove-urls" className="text-gray-700">Removal of URLs</label>
                  </div>
                  <div>
                      <input type="checkbox" id="remove-html" className="mr-2" />
                      <label htmlFor="remove-html" className="text-gray-700">Removal of HTML Tags</label>
                  </div>
                  <div>
                      <input type="checkbox" id="stemming-lemmatization" className="mr-2" />
                      <label htmlFor="stemming-lemmatization" className="text-gray-700">Stemming & Lemmatization</label>
                  </div>
                  <div>
                      <input type="checkbox" id="tokenization" className="mr-2" />
                      <label htmlFor="tokenization" className="text-gray-700">Tokenization</label>
                  </div>
                  <div>
                      <input type="checkbox" id="text-normalization" className="mr-2" />
                      <label htmlFor="text-normalization" className="text-gray-700">Text Normalization</label>
                  </div>
              </div>

              <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                  Apply Filters
              </button>
          </div>
          <div className="text-left w-full p-2">
            <textarea className="w-full h-96 p-4 border border-gray-300 rounded-md" defaultValue={defaultText}/>
          </div>
      </div>
  );
}