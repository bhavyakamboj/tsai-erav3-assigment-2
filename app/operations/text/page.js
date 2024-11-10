import { redirect } from 'next/navigation';

export default function Home() {

    // Hero section
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Text Pre-Processing</h1>
                <p className="text-lg text-gray-600 mb-8">Select the option to perform pre-processing operations</p>
                
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Get Started
                </button>
            </div>
            
        </div>
    );
}