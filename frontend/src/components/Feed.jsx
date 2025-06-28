import { createSignal, createEffect, onMount } from 'solid-js';
import { tweetAPI } from '../api';
import ExternalPostModal from './ExternalPostModal';

export default function Feed() {
  const [tweets, setTweets] = createSignal([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal('');
  const [deletingTweet, setDeletingTweet] = createSignal(null);
  const [showExternalModal, setShowExternalModal] = createSignal(false);
  const [selectedTweet, setSelectedTweet] = createSignal(null);

  const fetchTweets = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await tweetAPI.getTweets();
      // Ensure data is always an array
      setTweets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching tweets:', err);
      setError('Failed to load tweets. Please try again.');
      setTweets([]); // Ensure tweets is always an array
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTweet = async (tweetId) => {
    if (!confirm('Are you sure you want to delete this tweet? This action cannot be undone.')) {
      return;
    }
    try {
      setDeletingTweet(tweetId);
      await tweetAPI.deleteTweet(tweetId);
      const currentTweets = tweets();
      if (Array.isArray(currentTweets)) {
        setTweets(currentTweets.filter(tweet => tweet.id !== tweetId));
      }
      alert('Tweet deleted successfully!');
    } catch (err) {
      console.error('Error deleting tweet:', err);
      setError('Failed to delete tweet. Please try again.');
    } finally {
      setDeletingTweet(null);
    }
  };

  const handleExternalPostSuccess = (result) => {
    alert(`Tweet posted successfully to Twitter Clone! ${result.external_id ? `ID: ${result.external_id}` : ''}`);
    fetchTweets();
  };

  const openExternalModal = (tweet) => {
    setSelectedTweet(tweet);
    setShowExternalModal(true);
  };

  const closeExternalModal = () => {
    setShowExternalModal(false);
    setSelectedTweet(null);
  };

  onMount(() => {
    fetchTweets();
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Safety check for tweets array
  const getTweetsArray = () => {
    const currentTweets = tweets();
    return Array.isArray(currentTweets) ? currentTweets : [];
  };

  return (
    <div class="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12 animate-fade-in-up">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h1 class="text-5xl font-bold gradient-text mb-4">
            Tweet Feed
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            All AI-generated tweets in one beautiful place
          </p>
        </div>

        {/* Refresh Button */}
        <div class="text-center mb-8 animate-fade-in-up" style="animation-delay: 0.1s">
          <button
            onClick={fetchTweets}
            disabled={isLoading()}
            class="btn-primary px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading() ? (
              <div class="flex items-center justify-center">
                <div class="spinner h-6 w-6 mr-3"></div>
                <span class="animate-pulse">Loading...</span>
              </div>
            ) : (
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Feed
              </span>
            )}
          </button>
        </div>

        {isLoading() && (
          <div class="flex justify-center items-center py-16">
            <div class="text-center">
              <div class="spinner h-16 w-16 mx-auto mb-4"></div>
              <p class="text-gray-600 dark:text-gray-300 animate-pulse">Loading your tweets...</p>
            </div>
          </div>
        )}

        {error() && (
          <div class="card border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 mb-8 animate-bounce-in">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-semibold text-red-800 dark:text-red-200">Error</h3>
                <p class="text-sm text-red-700 dark:text-red-300 mt-1">{error()}</p>
                <button
                  onClick={fetchTweets}
                  class="mt-3 text-sm text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 underline transition-colors"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {!isLoading() && !error() && getTweetsArray().length === 0 && (
          <div class="card text-center py-16 animate-fade-in-scale">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">No tweets yet</h3>
            <p class="text-gray-500 dark:text-gray-300 text-lg mb-6">Generate your first tweet to see it here!</p>
            <button
              onClick={() => window.location.hash = '#generate'}
              class="btn-primary px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold rounded-xl"
            >
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your First Tweet
              </span>
            </button>
          </div>
        )}

        {!isLoading() && !error() && getTweetsArray().length > 0 && (
          <div class="space-y-8">
            <div class="text-center mb-6 animate-fade-in-up" style="animation-delay: 0.2s">
              <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
                <svg class="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Showing {getTweetsArray().length} tweet{getTweetsArray().length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            {getTweetsArray().map((tweet, index) => (
              <div class="tweet-card animate-fade-in-up" style={`animation-delay: ${0.3 + index * 0.1}s`}>
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                      <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center space-x-3">
                        <span class="text-lg font-semibold text-gray-900 dark:text-white">AI Tweet Generator</span>
                        <span class="text-gray-400">•</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">{formatDate(tweet.created_at)}</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <button
                          onClick={() => openExternalModal(tweet)}
                          class="action-btn text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                          title="Post to external site"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTweet(tweet.id)}
                          disabled={deletingTweet() === tweet.id}
                          class="action-btn text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete tweet"
                        >
                          {deletingTweet() === tweet.id ? (
                            <div class="spinner h-5 w-5"></div>
                          ) : (
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-4 border border-blue-100 dark:border-gray-600">
                      <p class="text-gray-800 dark:text-gray-100 text-lg leading-relaxed whitespace-pre-wrap">{tweet.content}</p>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div class="flex items-center space-x-2 mb-2">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Original prompt</span>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 italic">"{tweet.prompt}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* External Post Modal */}
        <ExternalPostModal
          tweet={selectedTweet()}
          onClose={closeExternalModal}
          onSuccess={handleExternalPostSuccess}
        />
      </div>
    </div>
  );
} 