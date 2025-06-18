import { createSignal } from 'solid-js';
import './index.css';
import Chatbot from './components/Chatbot';
import Feed from './components/Feed';

export default function App() {
  const [currentPage, setCurrentPage] = createSignal('generate');

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900 ml-2">AI Tweet Generator</span>
            </div>
            
            <div class="flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage('generate')}
                class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage() === 'generate' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Generate
              </button>
              <button
                onClick={() => setCurrentPage('feed')}
                class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage() === 'feed' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Feed
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      {currentPage() === 'generate' ? <Chatbot /> : <Feed />}
    </div>
  );
} 