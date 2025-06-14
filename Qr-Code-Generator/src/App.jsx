/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  ClipboardCopy,
  Trash2,
  Sun,
  Moon,
  Camera,
  FileText,
} from "lucide-react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import QrScanner from "qr-scanner";

export default function App() {
  const [text, setText] = useState("");
  const [bulk, setBulk] = useState(false);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);
  const [scanned, setScanned] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = (id, type = "png") => {
    const element = document.getElementById(id);
    if (type === "png") {
      const pngUrl = element
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    } else if (type === "svg") {
      const svgElement = element.outerHTML;
      const blob = new Blob([svgElement], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleGenerate = () => {
    if (text.trim()) {
      setHistory((prev) => [...new Set([text, ...prev])]);
    }
  };

  const handleScan = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      const result = await QrScanner.scanImage(file);
      setScanned(result);
      setText(result);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-2xl p-8 space-y-6"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center text-purple-400">
              <QrCode className="w-6 h-6" />
              <h1 className="text-2xl font-bold tracking-tight">
                Modern QR Generator
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="hover:scale-110 transition-transform"
            >
              {theme === "dark" ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-indigo-500" />
              )}
            </button>
          </div>

          <textarea
            rows={bulk ? 5 : 2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              bulk
                ? "Enter multiple values (one per line)..."
                : "Enter a link, message, or any text..."
            }
            className="w-full bg-black/40 text-white border border-white/20 placeholder-gray-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setBulk(!bulk)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md"
            >
              {bulk ? "Single Mode" : "Bulk Mode"}
            </button>

            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md"
            >
              Generate
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
            >
              <ClipboardCopy size={18} />
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={handleScan}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center gap-2"
            >
              <Camera size={18} />
              Scan
            </button>

            <button
              onClick={() => {
                setText("");
                setHistory([]);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-2"
            >
              <Trash2 size={18} />
              Clear
            </button>
          </div>

          {scanned && (
            <p className="text-sm text-green-400">
              <b>Scanned:</b> {scanned}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6">
            {(bulk ? text.split("\n").filter(Boolean) : [text]).map(
              (val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-black/30 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10 shadow-lg"
                >
                  <QRCodeCanvas id={`qr-canvas-${i}`} value={val} size={150} />
                  <QRCodeSVG
                    id={`qr-svg-${i}`}
                    value={val}
                    size={150}
                    style={{ display: "none" }}
                  />
                  <div className="text-xs mt-2 truncate">{val}</div>
                  <div className="flex gap-2 justify-center mt-2">
                    <button
                      onClick={() => handleDownload(`qr-canvas-${i}`)}
                      className="text-blue-400 text-sm hover:underline"
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => handleDownload(`qr-svg-${i}`, "svg")}
                      className="text-yellow-400 text-sm hover:underline"
                    >
                      SVG
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </div>

          {history.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold flex gap-2 items-center text-purple-400 mb-3">
                <FileText />
                History
              </h2>
              <ul className="text-sm space-y-1 list-disc pl-5 text-gray-300">
                {history.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
