import { createSignal } from 'solid-js';

export default function AnimationShowcase() {
  const [isVisible, setIsVisible] = createSignal(false);

  return (
    <div class="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto">
        {/* Header */}
        <div class="text-center mb-12 animate-fade-in-up">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-5xl font-bold gradient-text mb-4">
            Animation Showcase
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Explore the beautiful animations and hover effects
          </p>
        </div>

        {/* Animation Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Fade In Up Animation */}
          <div class="card animate-fade-in-up" style="animation-delay: 0.1s">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fade In Up</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Smooth entrance animation</p>
            </div>
          </div>

          {/* Bounce In Animation */}
          <div class="card animate-bounce-in" style="animation-delay: 0.2s">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bounce In</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Playful bounce effect</p>
            </div>
          </div>

          {/* Float Animation */}
          <div class="card animate-float" style="animation-delay: 0.3s">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Float</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Gentle floating motion</p>
            </div>
          </div>

          {/* Pulse Glow Animation */}
          <div class="card animate-pulse-glow" style="animation-delay: 0.4s">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66-4.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pulse Glow</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Glowing pulse effect</p>
            </div>
          </div>

          {/* Slide In Left Animation */}
          <div class="card animate-slide-in-left" style="animation-delay: 0.5s">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Slide In Left</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Smooth slide entrance</p>
            </div>
          </div>

          {/* Slide In Right Animation */}
          <div class="card animate-slide-in-right" style="animation-delay: 0.6s">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Slide In Right</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Smooth slide entrance</p>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div class="mt-12 space-y-8">
          
          {/* Enhanced Buttons */}
          <div class="card">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Enhanced Buttons</h3>
            <div class="flex flex-wrap gap-4">
              <button class="btn-primary px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold rounded-xl">
                Primary Button
              </button>
              <button class="btn-primary px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg font-semibold rounded-xl">
                Success Button
              </button>
              <button class="btn-primary px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-lg font-semibold rounded-xl">
                Danger Button
              </button>
            </div>
          </div>

          {/* Enhanced Inputs */}
          <div class="card">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Enhanced Inputs</h3>
            <div class="space-y-4">
              <input 
                type="text" 
                placeholder="Enhanced input field..." 
                class="input-enhanced"
              />
              <textarea 
                placeholder="Enhanced textarea..." 
                rows="3"
                class="input-enhanced resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div class="card">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Action Buttons</h3>
            <div class="flex flex-wrap gap-4">
              <button class="action-btn text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button class="action-btn text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button class="action-btn text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Toggle Animation */}
          <div class="card">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Toggle Animation</h3>
            <button 
              onClick={() => setIsVisible(!isVisible())}
              class="btn-primary px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg font-semibold rounded-xl"
            >
              {isVisible() ? 'Hide' : 'Show'} Animation
            </button>
            {isVisible() && (
              <div class="mt-4 animate-fade-in-scale">
                <div class="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-6 text-center">
                  <p class="text-purple-800 dark:text-purple-200 font-semibold">
                    ✨ This content appeared with a beautiful animation!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 