import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const priorityColors = {
    high: "border-red-500 text-red-700 bg-red-100",
    medium: "border-yellow-500 text-yellow-700 bg-yellow-100",
    low: "border-green-500 text-green-700 bg-green-100",
  };
  const priorityClass = priorityColors[task.priority] || priorityColors.medium;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.18 }}
      className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex flex-col md:flex-row justify-between items-center border-l-4 ${priorityClass}`}
    >
      <div>
        <h3 className={`text-lg font-bold ${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </h3>
        <p className={`text-gray-600 dark:text-gray-300 ${task.completed ? "line-through" : ""}`}>
          {task.description}
        </p>
        <div className="flex gap-2 items-center mt-2">
          <span className={`text-xs px-2 py-1 rounded-md inline-block ${priorityClass}`}>
            {task.completed ? "Completed" : `Priority: ${task.priority}`}
          </span>
          {task.dueDate && !task.completed && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Due: {new Date(task.dueDate).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {!task.completed && (
          <Link
            to={`/edit/${task.id}`}
            className="px-4 py-2 text-blue-700 border border-blue-400 rounded hover:bg-blue-100"
          >
            Edit
          </Link>
        )}

        <button
          onClick={() => onToggleComplete(task.id)}
          className={`px-4 py-2 border rounded ${
            task.completed
              ? "text-yellow-700 border-yellow-400 hover:bg-yellow-100"
              : "text-green-700 border-green-400 hover:bg-green-100"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this task?")) {
              onDelete(task.id);
            }
          }}
          className="px-4 py-2 text-red-700 border border-red-400 rounded hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;