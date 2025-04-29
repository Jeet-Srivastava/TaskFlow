'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TodoProvider } from './TodoContext';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

export const Todo = () => {
  const [mounted, setMounted] = useState(false);

  // After component mounts, make sure state is updated
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <TodoProvider>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-3xl mx-auto px-6 py-16"
      >
        <motion.div
          className="relative w-full h-full p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-white/5 dark:bg-black/20 border border-white/10 shadow-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-50 pointer-events-none" />
          
          <header className="mb-12 text-center">
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent pb-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 500, 
                damping: 15,
                delay: 0.3
              }}
            >
              TaskFlow
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-gray-400 mt-4 text-xl">
                The Ultimate task manager
              </p>
              {mounted && (
                <p className="text-base text-gray-500 mt-2">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </motion.div>
          </header>
          
          <TodoInput />
          <TodoList />
        </motion.div>
      </motion.div>
    </TodoProvider>
  );
}; 