import { onCleanup } from 'solid-js';

export default function AnimatedBlob() {
  // Animate the SVG path using CSS keyframes
  return (
    <div class="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
      <svg
        width="1200"
        height="900"
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full animate-blob-morph"
        style="filter: blur(60px); opacity: 0.7;"
      >
        <defs>
          <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#667eea" />
            <stop offset="50%" stop-color="#764ba2" />
            <stop offset="100%" stop-color="#f093fb" />
          </linearGradient>
        </defs>
        <path>
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="M 600 100 Q 900 150 900 450 Q 900 750 600 800 Q 300 750 300 450 Q 300 150 600 100 Z;
                    M 600 120 Q 950 200 900 450 Q 950 700 600 780 Q 250 700 300 450 Q 250 200 600 120 Z;
                    M 600 100 Q 900 150 900 450 Q 900 750 600 800 Q 300 750 300 450 Q 300 150 600 100 Z" />
        </path>
      </svg>
      <style>{`
        @keyframes blob-morph {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-30px); }
        }
        .animate-blob-morph {
          animation: blob-morph 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 