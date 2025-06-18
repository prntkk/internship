import { createSignal, createEffect, onMount } from 'solid-js';
import { tweetAPI } from '../api';

export default function Feed() {
  const [tweets, setTweets] = createSignal([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal('');
  const [deletingTweet, setDeletingTweet] = createSignal(null);

  const fetchTweets = async () => {
    try {
      setIsLoading(true);
      setError('');
      console.log('🔄 Fetching tweets...');
      const data = await tweetAPI.getTweets();
      console.log('✅ Tweets fetched:', data);
      setTweets(data);
    } catch (err) {
      setError('Failed to load tweets. Please try again.');
      console.error('❌ Error fetching tweets:', err);
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
      console.log('🗑️ Deleting tweet:', tweetId);
      await tweetAPI.deleteTweet(tweetId);
      console.log('✅ Tweet deleted successfully');
      
      // Remove the tweet from the local state
      setTweets(tweets().filter(tweet => tweet.id !== tweetId));
      
      // Show success message
      alert('Tweet deleted successfully!');
    } catch (err) {
      setError('Failed to delete tweet. Please try again.');
      console.error('❌ Error deleting tweet:', err);
    } finally {
      setDeletingTweet(null);
    }
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

  return (
    <div class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Tweet Feed
          </h1>
          <p class="text-lg text-gray-600">
            All AI-generated tweets in one place
          </p>
        </div>

        {/* Refresh Button */}
        <div class="text-center mb-6">
          <button
            onClick={fetchTweets}
            disabled={isLoading()}
            class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading() ? (
              <div class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              '🔄 Refresh Feed'
            )}
          </button>
        </div>

        {isLoading() && (
          <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

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
                <button
                  onClick={fetchTweets}
                  class="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {!isLoading() && !error() && tweets().length === 0 && (
          <div class="bg-white rounded-lg shadow-xl p-12 text-center">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No tweets yet</h3>
            <p class="text-gray-500">Generate your first tweet to see it here!</p>
          </div>
        )}

        {!isLoading() && !error() && tweets().length > 0 && (
          <div class="space-y-6">
            <div class="text-center mb-4">
              <p class="text-sm text-gray-600">
                Showing {tweets().length} tweet{tweets().length !== 1 ? 's' : ''}
              </p>
            </div>
            {tweets().map((tweet) => (
              <div class="bg-white rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center space-x-2">
                        <span class="text-sm font-medium text-gray-900">AI Tweet Generator</span>
                        <span class="text-sm text-gray-500">•</span>
                        <span class="text-sm text-gray-500">{formatDate(tweet.created_at)}</span>
                      </div>
                      <button
                        onClick={() => deleteTweet(tweet.id)}
                        disabled={deletingTweet() === tweet.id}
                        class="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete tweet"
                      >
                        {deletingTweet() === tweet.id ? (
                          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p class="text-gray-800 whitespace-pre-wrap mb-3 text-lg">{tweet.content}</p>
                    <div class="bg-gray-50 rounded-lg p-3">
                      <p class="text-sm text-gray-600">
                        <span class="font-medium">Original prompt:</span> "{tweet.prompt}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 