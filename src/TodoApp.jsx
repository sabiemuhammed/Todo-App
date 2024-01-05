import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now().getMinutes(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(todoToEdit);
    setNewTodo(todoToEdit.text);
  };

  const updateTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, text: newTodo } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setNewTodo('');
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />
        {editingTodo ? (
          <div>
            <button onClick={updateTodo}>Update Todo</button>
            <button onClick={() => setEditingTodo(null)}>Cancel</button>
          </div>
        ) : (
          <button onClick={addTodo}>Add Todo</button>
        )}
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => editTodo(todo.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp