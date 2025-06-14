/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Percent, Users, Sun, Moon, Share2, RotateCcw } from "lucide-react";

export default function App() {
  const [bill, setBill] = useState(() => Number(localStorage.getItem("bill")) || 0);
  const [tipPercent, setTipPercent] = useState(() => Number(localStorage.getItem("tipPercent")) || 15);
  const [people, setPeople] = useState(() => Number(localStorage.getItem("people")) || 1);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("bill", bill.toString());
    localStorage.setItem("tipPercent", tipPercent.toString());
    localStorage.setItem("people", people.toString());
  }, [bill, tipPercent, people]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const tipAmount = (bill * tipPercent) / 100;
  const total = bill + tipAmount;
  const perPerson = people > 0 ? total / people : 0;

  const handleShare = async () => {
    const message = `Bill: ₹${bill}\nTip: ${tipPercent}%\nTotal: ₹${total.toFixed(2)}\nPer Person: ₹${perPerson.toFixed(2)}`;
    if (navigator.share) {
      await navigator.share({
        title: "Tip Calculator Result",
        text: message,
      });
    } else {
      alert("Sharing not supported on this browser. Copy manually:\n" + message);
    }
  };

  const resetCalculator = () => {
    setBill(0);
    setTipPercent(15);
    setPeople(1);
    localStorage.removeItem("bill");
    localStorage.removeItem("tipPercent");
    localStorage.removeItem("people");
  };

  return (
    <main className={`min-h-screen ${theme === "dark" ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-yellow-100 to-yellow-50 text-gray-900"} flex items-center justify-center px-4`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 rounded-2xl shadow-2xl w-full max-w-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-yellow-400">Tip Calculator</h1>
          <div className="flex gap-2">
            <button
              onClick={resetCalculator}
              className="text-yellow-400 hover:text-yellow-300"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
              className="text-yellow-400 hover:text-yellow-300"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-yellow-400" /> Bill Amount
            </label>
            <input
              type="number"
              className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white dark:bg-gray-700 dark:border-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Percent className="w-4 h-4 text-yellow-400" /> Tip %
            </label>
            <input
              type="number"
              className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white dark:bg-gray-700 dark:border-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={tipPercent}
              onChange={(e) => setTipPercent(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-yellow-400" /> Number of People
            </label>
            <input
              type="number"
              className="w-full mt-1 p-2 rounded-md bg-gray-700 text-white dark:bg-gray-700 dark:border-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gray-700 dark:bg-gray-700 p-4 rounded-xl text-sm space-y-2"
        >
          <div className="flex justify-between">
            <span className="text-gray-300">Tip Amount:</span>
            <span className="text-yellow-300 font-medium">₹{tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Total Bill:</span>
            <span className="text-yellow-300 font-medium">₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Per Person:</span>
            <span className="text-yellow-300 font-medium">₹{perPerson.toFixed(2)}</span>
          </div>
        </motion.div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </motion.div>
    </main>
  );
}
