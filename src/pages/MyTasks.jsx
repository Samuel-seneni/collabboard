import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import PageWrapper from "../components/PageWrapper";

const MyTasks = () => {
  const { tasks } = useContext(TaskContext);

  const myTasks = tasks.filter((t) => !t.completed);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <TaskList tasks={myTasks} />
    </div>
  );
};
export default MyTasks;
