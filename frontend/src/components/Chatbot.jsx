import { createSignal, createEffect } from 'solid-js';
import { tweetAPI } from '../api';

export default function Chatbot() {
  const [prompt, setPrompt] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [generatedTweet, setGeneratedTweet] = createSignal(null);
  const [error, setError] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt().trim()) return;

    setIsLoading(true);
    setError('');
    setGeneratedTweet(null);

    try {
      const tweet = await tweetAPI.generateTweet(prompt());
      setGeneratedTweet(tweet);
      setPrompt(''); // Clear the input after successful generation
    } catch (err) {
      setError('Failed to generate tweet. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            AI Tweet Generator
          </h1>
          <p class="text-lg text-gray-600">
            Generate engaging tweets with the power of AI
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} class="space-y-4">
            <div>
              <label for="prompt" class="block text-sm font-medium text-gray-700 mb-2">
                What would you like to tweet about?
              </label>
              <textarea
                id="prompt"
                value={prompt()}
                onInput={(e) => setPrompt(e.target.value)}
                placeholder="Enter your tweet idea or topic..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="4"
                disabled={isLoading()}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading() || !prompt().trim()}
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading() ? (
                <div class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating...
                </div>
              ) : (
                'Generate Tweet'
              )}
            </button>
          </form>
        </div>

        {error() && (
          <div class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{error()}</p>
              </div>
            </div>
          </div>
        )}

        {generatedTweet() && (
          <div class="bg-white rounded-lg shadow-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Generated Tweet</h3>
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <p class="text-gray-800 whitespace-pre-wrap">{generatedTweet().content}</p>
            </div>
            <div class="text-sm text-gray-500">
              <p>Original prompt: "{generatedTweet().prompt}"</p>
              <p>Generated at: {new Date(generatedTweet().created_at).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 