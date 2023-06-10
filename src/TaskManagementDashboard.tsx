import React, { useState } from "react";
import CustomNotification from "./CustomNotification";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./styles/tailwind.css";

interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
  comments: string[];
  attachments: string[];
  timeTracking: number;
}

interface Notification {
  id: number;
  message: string;
  type: string;
  timestamp: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    status: "In Progress",
    progress: 50,
    comments: ["Comment 1", "Comment 2"],
    attachments: ["Attachment 1", "Attachment 2"],
    timeTracking: 120,
  },
  {
    id: 2,
    title: "Task 2",
    status: "Completed",
    progress: 100,
    comments: ["Comment 3"],
    attachments: ["Attachment 3"],
    timeTracking: 180,
  },
  {
    id: 3,
    title: "Task 3",
    status: "Pending",
    progress: 0,
    comments: [],
    attachments: [],
    timeTracking: 0,
  },
];

const TaskManagementDashboard: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationTimeout, setNotificationTimeout] = useState<NodeJS.Timeout | null>(null);

  const addNotification = (message: string, type: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleString(),
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
  };

  const assignTask = () => {
    const assignedTask = {
      id: Date.now(),
      title: "New Task",
      status: "Pending",
      progress: 0,
      comments: [],
      attachments: [],
      timeTracking: 0,
    };

    setTaskList((prevTasks) => [...prevTasks, assignedTask]);
    addNotification("Task assigned to you.", "info");
  };

  const updateTask = () => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === 1) {
          return {
            ...task,
            title: "Updated Task",
            progress: 75,
          };
        }
        return task;
      })
    );
    addNotification("Task updated.", "success");
  };

  const checkDeadline = () => {
    const approachingTasks = taskList.filter(
      (task) => task.progress < 100 && task.progress > 0
    );

    if (approachingTasks.length > 0) {
      addNotification("Task deadline approaching!", "warning");
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          let progress = task.progress;
          let notificationMessage = "";
  
          if (task.status !== status) {
            if (status === "In Progress") {
              progress = 50;
              notificationMessage = "Task in progress.";
            } else if (status === "Completed") {
              progress = 100;
              notificationMessage = "Task completed.";
            } else if (status === "Pending") {
              progress = 0;
              notificationMessage = "Task pending.";
            }
  
            // Show a notification if the status has changed
            if (notificationMessage !== "") {
              // Clear all existing notifications
              setNotifications([]);
  
              // Add the new notification
              const newNotification = {
                id: Date.now(),
                message: notificationMessage,
                type: "success",
                timestamp: new Date().toLocaleString(),
              };
              setNotifications((prevNotifications) => [
                ...prevNotifications,
                newNotification,
              ]);
  
              // Set a timeout to remove the notification after 5 seconds
              const timeoutId = setTimeout(() => {
                setNotifications((prevNotifications) =>
                  prevNotifications.filter(
                    (notification) => notification.id !== newNotification.id
                  )
                );
              }, 5000);
            }
            return { ...task, status, progress };
          }
        }
        return task;
      })
    );
  };
  
  

  function handleDeleteTask(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="container mx-auto px-4">
      {/* Notifications */}
      {notifications.map((notification) => (
        <CustomNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          timestamp={notification.timestamp}
        />
      ))}
      {/* Task Management Dashboard */}
      <h1 className="text-primary text-2xl font-bold my-4">Task Management Dashboard</h1>
      <table className="w-full bg-green-100 border border-gray-200 rounded shadow">
        {/* Table Header */}
        <thead>
          <tr>
            <th className="py-3 px-4 bg-primary text-white font-bold">ID</th>
            <th className="py-3 px-4 bg-primary text-white font-bold">Title</th>
            <th className="py-3 px-4 bg-primary text-white font-bold">Status</th>
            <th className="py-3 px-4 bg-primary text-white font-bold">Progress</th>
            <th className="py-3 px-4 bg-primary text-white font-bold">Comments</th>
            <th className="py-3 px-4 bg-primary text-white font-bold">Attachments</th>
            <th className="py-3 px-4 bg-primary text-white font-bold">Time Tracking</th>
            <th className="py-3 px-4 bg-primary text-white font-bold">Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {taskList.map((task) => (
            <tr key={task.id}>
              {/* Individual Task Data */}
              <td className="py-3 px-4 border-b">{task.id}</td>
              <td className="py-3 px-4 border-b">{task.title}</td>
              <td className="py-3 px-4 border-b">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="py-1 px-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td className="py-3 px-4 border-b">
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className={`h-full bg-primary rounded ${task.progress === 100 ? "bg-green-500" : ""}`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </td>
              <td className="py-3 px-4 border-b">
                <ul className="list-disc pl-4">
                  {task.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4 border-b">
                <ul className="list-disc pl-4">
                  {task.attachments.map((attachment, index) => (
                    <li key={index}>
                      <a href={attachment} target="_blank" rel="noopener noreferrer">
                        Attachment {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4 border-b">{task.timeTracking}</td>
              {/* Delete Button */}
              <td className="py-3 px-4 border-b">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  
};

export default TaskManagementDashboard;
