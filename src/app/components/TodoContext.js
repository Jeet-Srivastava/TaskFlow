'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context with a default value
const TodoContext = createContext(undefined);

// Custom hook to use the Todo context
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

// Provider component
export const TodoProvider = ({ children }) => {
  // Initialize with local storage if available (client-side only)
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        // Parse the stored JSON and convert date strings back to Date objects
        const parsedTodos = JSON.parse(storedTodos).map((todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to parse todos from localStorage:', error);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos(prev => [newTodo, ...prev]);
    }
  };

  // Toggle a todo's completed status
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, clearCompleted }}
    >
      {children}
    </TodoContext.Provider>
  );
}; 