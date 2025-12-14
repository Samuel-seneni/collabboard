import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { tasks, dispatch } = useContext(TaskContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const taskToEdit = tasks.find((t) => t.id === Number(id));

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "EDIT_TASK",
      payload: { ...task, id: Number(id) },
    });

    navigate("/tasks");
  };

  if (!taskToEdit) {
    return <p className="text-red-600">Task not found!</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Edit Task</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Task Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded-lg"
            rows="3"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block mb-1 font-medium">Priority</label>
          <select
            className="w-full border px-3 py-2 rounded-lg"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="datetime-local"
            className="w-full border px-3 py-2 rounded-lg"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>

        {/* Save */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTask;
