'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTodos } from './TodoContext';

export const TodoItem = ({ todo, index }) => {
  const { toggleTodo, deleteTodo } = useTodos();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Small delay to allow animation to complete
    setTimeout(() => deleteTodo(todo.id), 300);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  // Format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(todo.createdAt);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, height: 0, y: -20, scale: 0.9 }}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 30, 
          delay: index * 0.05 
        }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        style={{ 
          overflow: 'hidden',
          originY: 0
        }}
        className={`todo-item ios-card p-6 mb-5 ${isDeleting ? 'opacity-50' : ''}`}
      >
        <div className="flex items-center">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleToggle}
            className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-5
              ${todo.completed 
                ? 'bg-[var(--complete)] border-[var(--complete)] completed-checkbox' 
                : 'border-gray-300 dark:border-gray-600'}`}
          >
            {todo.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <CheckIcon className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.button>

          <div className="flex-grow">
            <motion.p 
              className={`text-xl ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400 completed-text' : ''}`}
              animate={{ 
                x: isHovering && !todo.completed ? [0, 2, -2, 0] : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {todo.text}
            </motion.p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
              {formattedDate}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="text-[var(--delete)] ml-3 p-2.5 rounded-full"
          >
            <TrashIcon className="w-7 h-7" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 