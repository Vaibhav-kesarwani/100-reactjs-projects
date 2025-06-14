// src/components/EmojiSearch.jsx
import {motion} from 'framer-motion';
import React, { useState } from 'react';

const emojiList = [
  { symbol: '😀', name: 'Grinning Face' },
  { symbol: '😂', name: 'Face with Tears of Joy' },
  { symbol: '❤️', name: 'Red Heart' },
  { symbol: '🔥', name: 'Fire' },
  { symbol: '🎉', name: 'Party Popper' },
  { symbol: '🍕', name: 'Pizza' },
  { symbol: '🚀', name: 'Rocket' },
  { symbol: '🌈', name: 'Rainbow' },
  { symbol: '🎶', name: 'Musical Notes' },
  { symbol: '⚽️', name: 'Soccer Ball' },
  { symbol: '🐶', name: 'Dog Face' },
  { symbol: '🐱', name: 'Cat Face' },
];

const EmojiSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmojis = emojiList.filter((emoji) =>
    emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center ">
      <h1 className="text-2xl font-bold mb-4 border border-box rounded bg-yellow-100">Emoji Search</h1>

      <input
        type="text"
        placeholder="Search for an emoji..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-xl transition-shadow duration-220"
      />

      <div className="grid grid-cols-3 gap-4">
        {filteredEmojis.map((emoji) => (
          <motion.div
            key={emoji.symbol}
            className="p-4 border rounded-lg hover:bg-gray-100 text-2xl"
            initial={{ y: 50, opacity: 0.5}}
            animate={{ y: 0, opacity: 1}}
            whileHover={{ y: -20, scale: 1.2}}
            transition={{ 
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }}
          >
            <span>{emoji.symbol}</span>
            <p className="text-sm mt-1">{emoji.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmojiSearch;
