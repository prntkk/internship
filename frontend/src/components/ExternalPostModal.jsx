import { createSignal, createEffect } from 'solid-js';
import { tweetAPI } from '../api';

export default function ExternalPostModal({ tweet, onClose, onSuccess }) {
  const [editedContent, setEditedContent] = createSignal('');
  const [isPosting, setIsPosting] = createSignal(false);
  const [error, setError] = createSignal('');

  // Initialize edited content when tweet changes
  createEffect(() => {
    if (tweet) {
      setEditedContent(tweet.content);
    }
  });

  const handlePost = async () => {
    if (!editedContent().trim()) {
      setError('Tweet content cannot be empty');
      return;
    }
    setIsPosting(true);
    setError('');
    try {
      const result = await tweetAPI.postToExternal(tweet.id, editedContent());
      if (result.success) {
        onSuccess(result);
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to post to external site. Please try again.');
      console.error('Error posting to external:', err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleClose = () => {
    setError('');
    setEditedContent(tweet ? tweet.content : '');
    onClose();
  };

  if (!tweet) return null;

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors">
        {/* Header */}
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Review & Post to Twitter Clone</h2>
          <button
            onClick={handleClose}
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div class="p-6 space-y-6">
          {/* Original Prompt */}
          {tweet && (
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Original Prompt</h3>
              <p class="text-gray-600 dark:text-gray-300">"{tweet.prompt}"</p>
            </div>
          )}

          {/* Tweet Content Editor */}
          <div>
            <label for="tweetContent" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Tweet Content <span class="text-gray-500 dark:text-gray-400">({editedContent().length}/280 characters)</span>
            </label>
            <textarea
              id="tweetContent"
              value={editedContent()}
              onInput={(e) => setEditedContent(e.target.value)}
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white resize-none"
              rows="4"
              maxlength="280"
              placeholder="Edit your tweet content..."
            />
            <div class="flex justify-between items-center mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                You can edit the AI-generated content before posting
              </p>
              <div class={`text-sm ${editedContent().length > 260 ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}> 
                {editedContent().length}/280
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error() && (
            <div class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-red-800 dark:text-red-200">{error()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          <div class="bg-blue-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Preview</h3>
            <div class="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">You</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">•</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">now</span>
                  </div>
                  <p class="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{editedContent() || 'Your tweet will appear here...'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={handleClose}
            disabled={isPosting()}
            class="px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            disabled={isPosting() || !editedContent().trim()}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPosting() ? (
              <div class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Posting...
              </div>
            ) : (
              'Post to Twitter Clone'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 