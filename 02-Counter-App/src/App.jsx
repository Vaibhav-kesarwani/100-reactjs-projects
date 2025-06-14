/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Minus, Plus, Volume2, VolumeX, Moon, Sun } from "lucide-react";

// Hook to get window size for confetti
const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const resize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return size;
};

export default function App() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [count, setCount] = useState(() => Number(localStorage.getItem("count")) || 0);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [sound, setSound] = useState(() => localStorage.getItem("sound") === "false" ? false : true);

  const playConfettiSound = () => {
    if (sound) {
      const audio = new Audio("/confetti.mp3");
      audio.play();
    }
  };

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sound", sound.toString());
  }, [sound]);

  useEffect(() => {
    if (showConfetti) {
      playConfettiSound();
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setButtonDisabled(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [playConfettiSound, showConfetti]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));
  const toggleSound = () => setSound(prev => !prev);

  const handleIncrease = () => {
    setCount(prev => {
      const next = prev + 1;
      if (next % 10 === 0) {
        setShowConfetti(true);
        setButtonDisabled(true);
      }
      return next;
    });
  };

  const handleDecrease = () => {
    if (count > 0) setCount(prev => prev - 1);
  };

  const handleReset = () => {
    setCount(0);
    setButtonDisabled(false);
    setShowConfetti(false);
  };

  return (
    <div className={`min-h-screen px-4 py-8 flex flex-col justify-center items-center transition-colors duration-300 ${
      theme === "light" ? "bg-gradient-to-br from-yellow-100 to-blue-200 text-gray-900" : "bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"
    }`}>
      {showConfetti && (
        <Confetti width={width} height={height} style={{ position: "fixed", top: 0, left: 0, zIndex: 999 }} />
      )}

      <motion.h1
        className="text-4xl font-extrabold mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎯 Stylish Counter App
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          className={`text-7xl font-black mb-10 ${count > 0 && count % 10 === 0 ? "text-emerald-400" : ""}`}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {count}
        </motion.div>
      </AnimatePresence>

      <div className="grid gap-4 w-full max-w-xs">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleIncrease}
          disabled={buttonDisabled}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-lg transition-all ${
            buttonDisabled ? "bg-gray-400 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Plus size={20} /> Increase
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDecrease}
          disabled={buttonDisabled || count === 0}
          className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-lg transition-all ${
            buttonDisabled || count === 0 ? "bg-gray-400 cursor-not-allowed text-white" : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          <Minus size={20} /> Decrease
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          disabled={buttonDisabled}
          className={`py-3 rounded-lg font-semibold text-lg transition-all ${
            buttonDisabled ? "bg-gray-400 cursor-not-allowed text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }`}
        >
          🔁 Reset
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="py-3 rounded-lg font-semibold text-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          Toggle {theme === "light" ? "Dark" : "Light"} Theme
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleSound}
          className="py-3 rounded-lg font-semibold text-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
        >
          {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
          {sound ? "Sound On" : "Sound Off"}
        </motion.button>
      </div>
    </div>
  );
}
