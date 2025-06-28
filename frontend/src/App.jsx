import AnimatedBlob from "./components/ui/AnimatedBlob";
import Chatbot from './components/Chatbot';
import Feed from './components/Feed';
import Navigation from './components/Navigation';
import { createSignal } from 'solid-js';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = createSignal('generate');
  const [theme, setTheme] = createSignal('light');

  const toggleTheme = () => {
    setTheme(theme() === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme() === 'light');
  };

  return (
    <div class={`min-h-screen transition-colors duration-300 relative ${theme() === 'dark' ? 'dark' : ''}`}> 
      <AnimatedBlob />
      <Navigation 
        currentPage={currentPage()} 
        setCurrentPage={setCurrentPage} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <div class="animate-fade-in-up" style="animation-delay: 0.2s">
        {currentPage() === 'generate' ? <Chatbot theme={theme()} /> : <Feed theme={theme()} />}
      </div>
    </div>
  );
} 