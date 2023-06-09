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

  const handleTimeTrackingChange = (id: number, timeTracking: number) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, timeTracking };
        }

        return task;
      })
    );
  };

  const handleAttachmentUpload = (id: number, files: FileList) => {
    const attachments = Array.from(files).map((file) => file.name);

    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, attachments };
        }

        return task;
      })
    );
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
                  onChange={(e) =>
                    handleTimeTrackingChange(task.id, parseInt(e.target.value))
                  }
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
