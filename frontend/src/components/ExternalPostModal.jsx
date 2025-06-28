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
    <div class="modal-overlay" onClick={handleClose}>
      <div class="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div class="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold gradient-text">Review & Post</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">Share your AI-generated tweet</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            class="action-btn text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div class="py-6 space-y-6">
          {/* Original Prompt */}
          {tweet && (
            <div class="card bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-blue-100 dark:border-gray-600">
              <div class="flex items-center space-x-2 mb-3">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-sm font-semibold text-blue-800 dark:text-blue-200">Original Prompt</h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300 italic">"{tweet.prompt}"</p>
            </div>
          )}

          {/* Tweet Content Editor */}
          <div>
            <label for="tweetContent" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Edit Your Tweet
              <span class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({editedContent().length}/280 characters)
              </span>
            </label>
            <div class="relative">
              <textarea
                id="tweetContent"
                value={editedContent()}
                onInput={(e) => setEditedContent(e.target.value)}
                class="input-enhanced resize-none"
                rows="5"
                maxlength="280"
                placeholder="Edit your tweet content..."
              />
              <div class="absolute bottom-3 right-3">
                <div class={`text-sm font-medium ${editedContent().length > 260 ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}> 
                  {editedContent().length}/280
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              ✏️ You can edit the AI-generated content before posting
            </p>
          </div>

          {/* Error Message */}
          {error() && (
            <div class="card border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 animate-bounce-in">
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
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          <div class="card bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600">
            <div class="flex items-center space-x-2 mb-4">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-200">Preview</h3>
            </div>
            <div class="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <span class="font-semibold text-gray-900 dark:text-white">You</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">now</span>
                  </div>
                  <p class="text-gray-800 dark:text-gray-100 text-lg leading-relaxed whitespace-pre-wrap">
                    {editedContent() || 'Your tweet will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 -mx-6 -mb-6 px-6 pb-6">
          <button
            onClick={handleClose}
            disabled={isPosting()}
            class="btn-primary px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            disabled={isPosting() || !editedContent().trim()}
            class="btn-primary px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isPosting() ? (
              <div class="flex items-center">
                <div class="spinner h-5 w-5 mr-3"></div>
                <span class="animate-pulse">Posting...</span>
              </div>
            ) : (
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Post to Twitter Clone
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 