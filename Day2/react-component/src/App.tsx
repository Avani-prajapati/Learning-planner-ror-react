import TaskForm from "./components/TaskForm";
import { useState } from "react";
import TaskList, {type Task } from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Task Tracker
        </h1>
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No tasks yet. Add your first task! 
          </p>
        )}
      </div>
    </div>
  );
};

export default App;