import React, { useState } from "react";
import { createTask } from "../config/api";

interface TaskCreationPageProps {
  email: string;
}

const TaskCreationPage: React.FC<TaskCreationPageProps> = ({ email }) => {  const [taskName, setTaskName] = useState<string>("");
  const [status, setStatus] = useState<string>("Pending");
  const [comment, setComment] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = Number(event.target.value);
    setTime(inputTime >= 0 ? inputTime : 0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    // Validate inputs
    const validationErrors: string[] = [];

    if (!taskName.trim()) {
      validationErrors.push("Task name is required");
    }

    if (time === 0) {
      validationErrors.push("Time should be greater than 0");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with API calls or other logic
    console.log("Task Name:", taskName);
    console.log("Status:", status);
    console.log("Comment:", comment);
    console.log("Time:", time);

    // Reset form fields
    setTaskName("");
    setStatus("Pending");
    setComment("");
    setTime(0);
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
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 text-left">
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
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 text-left">
              Status
            </label>
            <select
              id="priority"
              name="priority"
              className="input input-bordered w-full px-4 py-2"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="low">Pending</option>
              <option value="medium">In Progress</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="Comment" className="block text-sm font-medium text-gray-700 text-left">
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
            <label htmlFor="taskTime" className="block text-sm font-medium text-gray-700 text-left">
              How much time do you want to spend?
            </label>
            <input
              type="number"
              id="taskTime"
              name="taskTime"
              className="input input-bordered w-full px-4 py-2"
              placeholder="Enter time amount (in minutes)"
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
