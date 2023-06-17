import React, { useState, useEffect } from "react";
import { createTask, getUserIdByEmail } from "../../config/api";
import ValidationErrors from "../errors/ValidationErrors";
import "../../styles/taskCreationStyling.css";

import LoginPage from "./LoginPage";

interface TaskCreationPageProps {
  email: string;
}

interface FormValues {
  taskName: string;
  status: string;
  comment: string;
  time: string;
}

const TaskCreationPage: React.FC<TaskCreationPageProps> = ({ email }) => {
  // State variables
  const [formValues, setFormValues] = useState<FormValues>({
    taskName: "",
    status: "Pending",
    comment: "",
    time: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch user ID and check login status when the component mounts or email changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserIdByEmail(email);
        const id = response.data;
        setUserId(id);
        setFetchError(null); // Reset the fetch error if it was successful
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
        setFetchError("Failed to fetch user ID. Please try again."); // Set the error message
      }

      const sessionToken = localStorage.getItem("sessionToken");
      setIsLoggedIn(!!sessionToken);
    };

    fetchData();
  }, [email]);

  // Login and logout handlers
  const handleLogin = (token: string) => {
    localStorage.setItem("sessionToken", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    setIsLoggedIn(false);
  };

  // Handle input changes
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    const { taskName, time } = formValues;
    const parsedTime = Date.parse(time);

    if (!taskName.trim()) {
      setErrors(["Task name is required"]);
      return;
    }

    if (!time || isNaN(parsedTime)) {
      setErrors(["Please enter a valid time"]);
      return;
    }

    if (!userId) {
      setErrors(["User ID not found"]);
      return;
    }

    try {
      await createTask(
        taskName,
        formValues.status,
        formValues.comment,
        time,
        userId || 0
      );
      setFormValues({ taskName: "", status: "Pending", comment: "", time: "" });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="flex flex-container">
      <div className="form-container">
        <h2 className="form-title">Create Task</h2>
        {/* Display the fetch error message */}
        {fetchError && <div className="error-message">{fetchError}</div>}{" "}
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {errors.length > 0 && <ValidationErrors errors={errors} />}

          <div className="mb-4">
            <label htmlFor="taskName" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              className="form-input"
              placeholder="Enter task name"
              value={formValues.taskName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="input input-bordered w-full px-4 py-2"
              value={formValues.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="form-textarea"
              placeholder="Enter task comment"
              value={formValues.comment}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="taskTime" className="form-label">
              When do you want this task to be done?
            </label>
            <input
              type="datetime-local"
              id="taskTime"
              name="time"
              className="form-input"
              placeholder="Enter time amount"
              value={formValues.time}
              onChange={handleChange}
              min={new Date()
                .toLocaleString("sv-SE", { timeZone: "Europe/Berlin" })
                .slice(0, 16)}
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-primary form-button">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationPage;
