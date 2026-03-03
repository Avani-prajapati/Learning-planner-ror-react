export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  return (
    <ul className="mt-6 space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
        >
          <span
            className={`cursor-pointer text-lg ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
            onClick={() => onToggle(task.id)}
          >
            {task.text}
          </span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 transition text-xl"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;