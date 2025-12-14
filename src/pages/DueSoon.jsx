import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import PageWrapper from "../components/PageWrapper";

const DueSoon = () => {
  const { tasks, dispatch } = useContext(TaskContext);

  const now = new Date();
  const next48 = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const dueSoon = tasks.filter((t) => t.dueDate && !t.completed && new Date(t.dueDate) <= next48);

  const handleToggleComplete = (id) => dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "DELETE_TASK", payload: id });
    }
  };

  return (
    <PageWrapper>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Due Soon</h2>
        <TaskList
          tasks={dueSoon}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </div>
    </PageWrapper>
  );
};

export default DueSoon;
