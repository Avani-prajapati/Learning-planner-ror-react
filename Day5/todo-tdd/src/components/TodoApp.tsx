import { useState } from "react";

export default function TodoApp() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (!todo.trim()) return;

    setTodos([...todos, todo]);
    setTodo("");
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

        <div className="flex gap-2 mb-4">
          <input
            placeholder="Add a todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
          />

          <button
            onClick={addTodo}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((t, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
            >
              <span>{t}</span>

              <button
                onClick={() => deleteTodo(index)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}