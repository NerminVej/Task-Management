import React, { useState, useEffect } from "react";
import { createTask, getUserIdByEmail } from "../config/api"; // Import the necessary functions from your API service
import LoginPage from "./LoginPage";

interface TaskCreationPageProps {
  email: string;
}

const TaskCreationPage: React.FC<TaskCreationPageProps> = ({ email }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [status, setStatus] = useState<string>("Pending");
  const [comment, setComment] = useState<string>("");
  const [time, setTime] = useState<string>(""); // Change the type to string
  const [errors, setErrors] = useState<string[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login state

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await getUserIdByEmail(email);

        const id = response.data; // Extract the user ID from the response data

        setUserId(id);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
        // Handle the error and display an error message to the user
      }
    };

    fetchUserId();
  }, [email]);

  //Handles the user being logged in even after a refresh.
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    setIsLoggedIn(!!sessionToken); // Set login state based on session token presence
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('sessionToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
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
    setTime(event.target.value); // Update the time state with the input value
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    // Validate inputs
    const validationErrors: string[] = [];

    if (!taskName.trim()) {
      validationErrors.push("Task name is required");
    }

    if (!time) {
      validationErrors.push("Time is required");
    }

    if (!userId) {
      validationErrors.push("User ID not found");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Call the createTask function with the necessary data
      await createTask(taskName, status, comment, time, userId || 0);

      // Reset form fields
      setTaskName("");
      setStatus("Pending");
      setComment("");
      setTime("");
    } catch (error) {
      console.error("Failed to create task:", error);
      // Handle the error and display an error message to the user
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginPage></LoginPage>
    );
  }

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
              How much time do you want to spend?
            </label>
            <input
              type="datetime-local" // Change the input type to datetime-local
              id="taskTime"
              name="taskTime"
              className="input input-bordered w-full px-4 py-2"
              placeholder="Enter time amount"
              value={time}
              onChange={handleTimeChange}
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
