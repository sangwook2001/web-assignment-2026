import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("my-todo-list");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(todos));
  }, [todos]);

  function addTodo(content) {
    const newTodo = {
      id: crypto.randomUUID(),
      content,
      isDone: false,
    };

    setTodos([newTodo, ...todos]);
  }

  function toggleTodo(id) {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  return (
    <main className="page">
      <section className="card">
        <h1>React TODO Starter</h1>
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </section>
    </main>
  );
}

export default App;
