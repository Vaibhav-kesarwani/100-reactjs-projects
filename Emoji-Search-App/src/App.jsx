// src/App.jsx
import EmojiSearch from './components/EmojiSearch';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 ">
      <EmojiSearch />
      <div className='absolute top-4 right-4'>
      <ThemeToggle />
      </div>
    </div>
  );
}

export default App;
