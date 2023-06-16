import React, { useState, useEffect } from "react";
import { createTask, getUserIdByEmail } from "../config/api";
import LoginPage from "./LoginPage";

interface TaskCreationPageProps {
  email: string;
}

const TaskCreationPage: React.FC<TaskCreationPageProps> = ({ email }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [status, setStatus] = useState<string>("Pending");
  const [comment, setComment] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await getUserIdByEmail(email);
        const id = response.data;
        setUserId(id);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();
  }, [email]);

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    setIsLoggedIn(!!sessionToken);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("sessionToken", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    setIsLoggedIn(false);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    const validationErrors: string[] = [];

    if (!taskName.trim()) {
      validationErrors.push("Task name is required");
    }

    if (!time) {
      validationErrors.push("Time is required");
    } else {
      const parsedTime = Date.parse(time);
      if (isNaN(parsedTime)) {
        validationErrors.push("Please enter a valid time");
      }
    }

    if (!userId) {
      validationErrors.push("User ID not found");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createTask(taskName, status, comment, time, userId || 0);
      setTaskName("");
      setStatus("Pending");
      setComment("");
      setTime("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Task</h2>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              className="input input-bordered w-full px-4 py-2"
              placeholder="Enter task name"
              value={taskName}
              onChange={handleTaskNameChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Status
            </label>
            <select
              id="priority"
              name="priority"
              className="input input-bordered w-full px-4 py-2"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="Comment"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="input input-bordered w-full px-4 py-2 h-24"
              placeholder="Enter task comment"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="taskTime"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              When do you want this task to be done?
            </label>
            <input
  type="datetime-local"
  id="taskTime"
  name="taskTime"
  className="input input-bordered w-full px-4 py-2"
  placeholder="Enter time amount"
  value={time}
  onChange={handleTimeChange}
  min={new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Berlin' }).slice(0, 16)}
/>




          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-primary text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-primary"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationPage;
