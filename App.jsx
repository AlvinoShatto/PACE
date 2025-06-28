import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(" https://pace-odbg.onrender.com/todos");
      setTodos(res.data || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await axios.post("https://pace-backend.onrender.com/todos", { text });
      setText("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">📝 Todo App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new todo..."
            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-2">
            {todos.length === 0 && (
              <li className="text-center text-gray-400">No todos yet.</li>
            )}
            {todos.map((todo) => (
              <li
                key={todo._id || todo.id}
                className="bg-gray-200 px-3 py-2 rounded-md"
              >
                {todo.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default App;