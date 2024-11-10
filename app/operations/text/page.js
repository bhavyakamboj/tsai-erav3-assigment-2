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
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-left">
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
      </div>
  );
}