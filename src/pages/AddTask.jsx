import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddTask = () => {
  const { dispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        ...taskData,
        completed: false,
      },
    });

    navigate("/tasks");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          className="border p-3 py-2 w-full md:w-auto rounded-1 dark:bg-gray-700"
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />

        <textarea
          rows="3"
          placeholder="Task description"
          className="border p-3 w-full rounded dark:bg-gray-700"
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
        ></textarea>

        <select
          className="border p-3 w-full rounded dark:bg-gray-700"
          onChange={(e) =>
            setTaskData({ ...taskData, priority: e.target.value })
          }
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <input
          type="datetime-local"
          className="border p-3 w-full rounded dark:bg-gray-700"
          onChange={(e) =>
            setTaskData({ ...taskData, dueDate: e.target.value })
          }
        />

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Add Task
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddTask;
