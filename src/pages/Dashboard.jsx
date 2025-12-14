import React, { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";
import CollabPreview from "../components/CollabPreview";

const Dashboard = () => {
  const { tasks } = useContext(TaskContext);
  const { darkMode } = useContext(ThemeContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const now = new Date();
  const twoDaysLater = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const myTasksCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const dueSoonCount = tasks.filter((task) => {
    if (!task.dueDate || task.completed) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate >= now && taskDate <= twoDaysLater;
  }).length;

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
          CollabBoard
        </h1>

        <nav className="space-y-4">
          <Link to="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/tasks" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
            My Tasks
          </Link>
          <Link to="/completed" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Completed
          </Link>
          <Link to="/due-soon" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Due Soon
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 dark:text-white">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Dashboard</h2>

          <div className="flex flex-wrap items-center gap-3">

            {/* Add Task Button */}
            <Link
              to="/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Task
            </Link>

            {/* Search */}
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Filter by priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <CollabPreview simulate={true} /> 

            {/* 🌙/☀️ Dark Mode Toggle — ADDED HERE */}
            <ThemeToggle /> 
          </div>
        </header>

        {/* Summary Boxes */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">My Tasks</h3>
            <p className="text-gray-500 dark:text-gray-300">{myTasksCount} active</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Completed</h3>
            <p className="text-gray-500 dark:text-gray-300">{completedCount} done</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Due Soon</h3>
            <p className="text-gray-500 dark:text-gray-300">{dueSoonCount} within 48h</p>
          </div>
        </section>

        {/* Nested Routes */}
        <section>
          <Outlet context={{ search, filter }} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
