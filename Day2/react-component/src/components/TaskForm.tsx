import { useState } from "react";
interface TaskFormProps {
  onAddTask: (task: string) => void;
}

const TaskForm= ({ onAddTask }: TaskFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAddTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task..."
        className="flex-1 border rounded px-2 py-1"
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;