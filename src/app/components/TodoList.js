'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { TodoItem } from './TodoItem';
import { useTodos } from './TodoContext';

export const TodoList = () => {
  const { todos, clearCompleted } = useTodos();
  const [filter, setFilter] = useState('all');

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Stats for the footer
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <LayoutGroup>
      <motion.div className="w-full">
        {/* Filter Tabs */}
        <motion.div className="mb-8 rounded-xl bg-white/10 dark:bg-zinc-800/50 backdrop-blur-sm p-2 flex border border-gray-200 dark:border-zinc-700 shadow-md">
          {['all', 'active', 'completed'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`relative flex-1 py-3.5 text-base font-medium rounded-lg capitalize overflow-hidden ${
                filter === tab ? 'text-white' : 'text-gray-500 dark:text-gray-300'
              }`}
            >
              {filter === tab && (
                <motion.div 
                  className="absolute inset-0 bg-[var(--accent)]"
                  layoutId="activeTab"
                />
              )}
              <span className="relative z-10">{tab}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Todo Items */}
        <AnimatePresence mode="popLayout">
          {filteredTodos.length > 0 ? (
            <motion.div className="space-y-5">
              {filteredTodos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div className="ios-card p-10 text-center text-gray-500 dark:text-gray-400">
              <p className="text-xl">No {filter !== 'all' ? filter : ''} tasks found.</p>
              <p className="text-base mt-3 opacity-75">Add a new task to get started.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {totalTodos > 0 && (
          <motion.div className="mt-10 flex justify-between items-center text-base text-gray-500 dark:text-gray-400">
            <p>{activeTodos} active, {completedTodos} completed</p>
            {completedTodos > 0 && (
              <motion.button
                onClick={clearCompleted}
                className="ios-btn text-[var(--delete)] text-base font-bold px-5 py-2.5"
              >
                Clear completed
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </LayoutGroup>
  );
}; 