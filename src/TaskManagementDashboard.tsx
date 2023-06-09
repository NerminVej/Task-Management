import React, { useState } from "react";
import "./tailwind.css";

interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
}

const tasks: Task[] = [
  { id: 1, title: "Task 1", status: "In Progress", progress: 50 },
  { id: 2, title: "Task 2", status: "Completed", progress: 100 },
  { id: 3, title: "Task 3", status: "Pending", progress: 0 },
];

const TaskManagementDashboard: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const handleStatusChange = (id: number, value: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: value } : task
      )
    );
  };

  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-primary text-2xl font-bold my-4 ">
        Task Management Dashboard
      </h1>
      <table className="task-table w-full ">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Title</th>
            <th className="py-2">Status</th>
            <th className="py-2">Progress</th>
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
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagementDashboard;
