import React, { useState } from "react";
import "./tailwind.css";

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
          let progress = 0;

          if (status === "In Progress") {
            progress = 50;
          } else if (status === "Completed") {
            progress = 100;
          } else if (status === "Pending") {
            progress = 0;
          }

          return { ...task, status, progress };
        }

        return task;
      })
    );
  };

  const handleTimeTrackingChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, timeTracking: Number(value) };
        }
        return task;
      })
    );
  };

  const handleAttachmentUpload = (id: number, files: FileList | null) => {
    if (files) {
      const attachments: string[] = [];
      for (let i = 0; i < files.length; i++) {
        attachments.push(files[i].name);
      }
      setTaskList((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              attachments: [...task.attachments, ...attachments],
            };
          }
          return task;
        })
      );
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-primary text-2xl font-bold my-4">
        Task Management Dashboard
      </h1>
      <table className="task-table w-full">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Title</th>
            <th className="py-2">Status</th>
            <th className="py-2">Progress</th>
            <th className="py-2">Comments</th>
            <th className="py-2">Attachments</th>
            <th className="py-2">Time Tracking</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr key={task.id}>
              <td className="py-2">{task.id}</td>
              <td className="py-2">{task.title}</td>
              <td className="py-2">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td className="py-2">
                <div className="progress-bar h-4 bg-gray-200 rounded">
                  <div
                    className="progress-bar-fill h-full bg-primary rounded"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </td>
              <td className="py-2">
                <ul>
                  {task.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2">
                <ul>
                  {task.attachments.map((attachment, index) => (
                    <li key={index}>{attachment}</li>
                  ))}
                </ul>
                <input
                  type="file"
                  onChange={(e) =>
                    handleAttachmentUpload(task.id, e.target.files as FileList)
                  }
                  multiple
                />
              </td>
              <td className="py-2">
                <input
                  type="number"
                  value={task.timeTracking}
                  onChange={(e) => handleTimeTrackingChange(task.id, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagementDashboard;
