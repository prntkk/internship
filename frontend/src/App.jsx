import { createSignal } from 'solid-js';
import './index.css';
import Chatbot from './components/Chatbot';
import Feed from './components/Feed';

export default function App() {
  const [currentPage, setCurrentPage] = createSignal('generate');
  const [theme, setTheme] = createSignal('light');

  const toggleTheme = () => {
    setTheme(theme() === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme() === 'light');
  };

  return (
    <div class={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${theme() === 'dark' ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav class="bg-white dark:bg-gray-900 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-600 dark:bg-blue-400 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white ml-2">AI Tweet Generator</span>
            </div>
            
            <div class="flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage('generate')}
                class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage() === 'generate' 
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Generate
              </button>
              <button
                onClick={() => setCurrentPage('feed')}
                class={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage() === 'feed' 
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Feed
              </button>
              <button
                onClick={toggleTheme}
                class="ml-4 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label="Toggle dark mode"
              >
                {theme() === 'light' ? (
                  <span class="flex items-center"><svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66-4.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>Light</span>
                ) : (
                  <span class="flex items-center"><svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>Dark</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      {currentPage() === 'generate' ? <Chatbot theme={theme()} /> : <Feed theme={theme()} />}
    </div>
  );
} 