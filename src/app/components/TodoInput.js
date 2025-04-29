'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTodos } from './TodoContext';

export const TodoInput = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="mb-10 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex gap-4 items-center">
        <motion.div 
          className="flex-grow relative"
          animate={{ scale: isFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Add a new task..."
            className="ios-input flex-grow text-xl w-full py-5"
          />
          {isFocused && (
            <motion.div 
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ 
                boxShadow: `0 0 0 2px var(--accent)`,
                zIndex: -1
              }}
            />
          )}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="ios-btn bg-[var(--accent)] text-white flex items-center justify-center h-16 w-16 rounded-full shadow-lg shadow-[var(--accent)]/20"
        >
          <PlusIcon className="w-7 h-7" />
        </motion.button>
      </div>
    </motion.form>
  );
}; 