import { createSignal } from 'solid-js';
import { tweetAPI } from '../api';
import ExternalPostModal from './ExternalPostModal';

export default function Chatbot() {
  const [prompt, setPrompt] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [generatedTweet, setGeneratedTweet] = createSignal(null);
  const [error, setError] = createSignal('');
  const [showExternalModal, setShowExternalModal] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt().trim()) return;
    setIsLoading(true);
    setError('');
    setGeneratedTweet(null);
    try {
      const tweet = await tweetAPI.generateTweet(prompt());
      setGeneratedTweet(tweet);
      setPrompt('');
    } catch (err) {
      setError('Failed to generate tweet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExternalPostSuccess = (result) => {
    alert(`Tweet posted successfully to Twitter Clone! ${result.external_id ? `ID: ${result.external_id}` : ''}`);
  };

  return (
    <div class="min-h-screen flex items-center justify-center px-4 bg-[#18181b] transition-colors duration-300">
      <div class="w-full max-w-md rounded-2xl shadow-xl p-8 border border-[#232329] bg-[#18181b]">
        <form onSubmit={handleSubmit} class="space-y-6">
          <label for="prompt" class="block text-lg font-semibold text-white mb-2">
            What would you like to tweet about?
          </label>
          <textarea
            id="prompt"
            value={prompt()}
            onInput={(e) => setPrompt(e.target.value)}
            placeholder="Enter your tweet idea or topic..."
            class="w-full rounded-lg border border-[#232329] bg-[#232329] text-white placeholder-[#a1a1aa] p-4 focus:outline-none focus:ring-2 focus:ring-white/80 transition resize-none min-h-[100px] text-base"
            rows="4"
            maxLength={500}
            disabled={isLoading()}
          />
          <button
            type="submit"
            disabled={isLoading() || !prompt().trim()}
            class="w-full py-3 rounded-lg bg-white text-[#18181b] font-semibold text-lg transition hover:bg-[#e4e4e7] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading() ? 'Generating…' : 'Generate Tweet'}
          </button>
        </form>

        {error() && (
          <div class="mt-6 text-sm text-red-400 text-center animate-fade-in-up">{error()}</div>
        )}

        {generatedTweet() && (
          <div class="mt-8 p-5 rounded-xl bg-[#232329] border border-[#232329] text-white animate-fade-in-up">
            <div class="mb-2 text-sm text-[#a1a1aa]">Generated Tweet</div>
            <div class="text-lg whitespace-pre-wrap mb-4">{generatedTweet().content}</div>
            <div class="flex gap-2">
              <button
                onClick={() => setShowExternalModal(true)}
                class="flex-1 py-2 rounded-lg bg-white text-[#18181b] font-medium text-base transition hover:bg-[#e4e4e7]"
              >
                Review & Post
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(generatedTweet().content)}
                class="px-4 py-2 rounded-lg border border-[#232329] bg-transparent text-white font-medium text-base transition hover:bg-[#27272a]"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {showExternalModal() && (
          <ExternalPostModal
            tweet={generatedTweet()}
            onClose={() => setShowExternalModal(false)}
            onSuccess={handleExternalPostSuccess}
          />
        )}
      </div>
    </div>
  );
} 