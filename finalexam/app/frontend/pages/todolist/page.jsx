"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Handle adding a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return; // Prevent empty tasks
    setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    setTaskInput(""); // Clear input field
  };

  // Handle toggling task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle deleting a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(255,211,70)]"
        />
        <button
          type="submit"
          className="bg-[rgb(255,211,70)] text-gray-900 px-4 py-2 rounded-lg shadow-md focus:outline-none"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks added yet!</p>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 border rounded-lg ${
              task.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
