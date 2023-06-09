import React from "react";
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
  return (
    <div className="container">
      <h1 className="text-primary">Task Management Dashboard</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
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
