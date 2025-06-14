/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Sun, Moon, Download, Trash2 } from "lucide-react";

export default function App() {
  const [color, setColor] = useState("#8b5cf6");
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("color-history")) || [];
    setHistory(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("color-history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "c" || e.key === "C") handleCopy();
      if (e.key === "t" || e.key === "T")
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [color, theme]);

  const addToHistory = (clr) => {
    if (!history.includes(clr)) {
      const updated = [clr, ...history].slice(0, 12);
      setHistory(updated);
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    addToHistory(newColor);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 40 * history.length;
    const ctx = canvas.getContext("2d");

    history.forEach((clr, i) => {
      ctx.fillStyle = clr;
      ctx.fillRect(0, i * 40, canvas.width, 40);
      ctx.fillStyle = "#fff";
      ctx.font = "16px sans-serif";
      ctx.fillText(clr, 10, i * 40 + 25);
    });

    const link = document.createElement("a");
    link.download = "palette.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex) => {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) h = s = 0;
    else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%)`;
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("color-history");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-zinc-50 via-zinc-200 to-zinc-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-white transition-all duration-300 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-30 max-w-lg mx-auto bg-white/10 dark:bg-zinc-800/50 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-wide">
            🎨 Modern Color Picker
          </h1>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 15 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>

        <div className="flex flex-col items-center gap-6">
          <motion.input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="appearance-none w-32 h-32 rounded-full border-none outline-none cursor-pointer focus:ring-0"
            style={{ backgroundColor: color, WebkitAppearance: "none" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 8 }}
          />

          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-800/60 backdrop-blur-md shadow-inner">
              <span className="font-mono text-lg">{color}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="ml-2"
              >
                {copied ? (
                  <Check className="text-emerald-400" size={20} />
                ) : (
                  <Copy className="text-white" size={20} />
                )}
              </motion.button>
            </div>

            <p className="text-sm font-mono text-zinc-300">
              {hexToRgb(color)} | {hexToHsl(color)}
            </p>
          </motion.div>

          <motion.div
            className="w-full h-10 rounded-lg mt-2 border border-white/10"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />

          <motion.div
            className="flex gap-4 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
            >
              <Download size={18} /> Download Palette
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
            >
              <Trash2 size={18} /> Clear History
            </motion.button>
          </motion.div>

          {history.length > 0 && (
            <motion.div
              className="grid grid-cols-6 gap-2 mt-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              {history.map((clr, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setColor(clr)}
                  title={clr}
                  className="w-8 h-8 rounded-full border-2 border-white/10 shadow cursor-pointer transition-transform hover:scale-110"
                  style={{ backgroundColor: clr }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}