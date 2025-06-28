import { createSignal } from 'solid-js';

export default function Navigation({ currentPage, setCurrentPage, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  // Safety checks for all signal props
  const getCurrentPage = () => {
    return typeof currentPage === 'function' ? currentPage() : currentPage;
  };

  const getThemeValue = () => {
    return typeof theme === 'function' ? theme() : theme;
  };

  const handleSetCurrentPage = (page) => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage(page);
    }
  };

  const handleToggleTheme = () => {
    if (typeof toggleTheme === 'function') {
      toggleTheme();
    }
  };

  return (
    <nav class="glass-card sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          {/* Logo */}
          <div class="flex items-center animate-fade-in-up">
            <div class="w-10 h-10 gradient-bg-primary rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <span class="text-xl font-bold gradient-text ml-3 font-['Poppins']">AI Tweet Generator</span>
          </div>
          
          {/* Desktop Navigation */}
          <div class="hidden md:flex items-center space-x-6 animate-fade-in-up" style="animation-delay: 0.1s">
            <button
              onClick={() => handleSetCurrentPage('generate')}
              class={`nav-item ${
                getCurrentPage() === 'generate' 
                  ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 active' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Generate
              </span>
            </button>
            <button
              onClick={() => handleSetCurrentPage('feed')}
              class={`nav-item ${
                getCurrentPage() === 'feed' 
                  ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 active' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Feed
              </span>
            </button>
            <button
              onClick={handleToggleTheme}
              class="btn-gradient px-4 py-2 rounded-xl text-sm font-medium shadow-lg"
              aria-label="Toggle dark mode"
            >
              {getThemeValue() === 'light' ? (
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66-4.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  Light
                </span>
              ) : (
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
                  </svg>
                  Dark
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div class="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen())}
              class="action-btn text-gray-700 dark:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen() && (
          <div class="md:hidden animate-fade-in-scale">
            <div class="px-2 pt-2 pb-3 space-y-1 glass-card mt-2 shadow-lg">
              <button
                onClick={() => {
                  handleSetCurrentPage('generate');
                  setIsMenuOpen(false);
                }}
                class={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  getCurrentPage() === 'generate' 
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Generate
                </span>
              </button>
              <button
                onClick={() => {
                  handleSetCurrentPage('feed');
                  setIsMenuOpen(false);
                }}
                class={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  getCurrentPage() === 'feed' 
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Feed
                </span>
              </button>
              <button
                onClick={() => {
                  handleToggleTheme();
                  setIsMenuOpen(false);
                }}
                class="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span class="flex items-center">
                  {getThemeValue() === 'light' ? (
                    <>
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66-4.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                      </svg>
                      Light Mode
                    </>
                  ) : (
                    <>
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
                      </svg>
                      Dark Mode
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 