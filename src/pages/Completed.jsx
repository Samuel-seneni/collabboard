import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import PageWrapper from "../components/PageWrapper";

const Completed = () => {
  const { tasks, dispatch } = useContext(TaskContext);
  const completedTasks = tasks.filter((t) => t.completed);

  const handleToggleComplete = (id) => dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "DELETE_TASK", payload: id });
    }
  };

  return (
    <PageWrapper>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Completed Tasks</h2>
        <TaskList
          tasks={completedTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </div>
    </PageWrapper>
  );
};


export default Completed;
