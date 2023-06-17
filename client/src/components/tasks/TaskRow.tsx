import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// Task interface defining the structure of a task object
interface Task {
  id: number;
  title: string;
  status: string;
  timeTracking: number;
  comment: string;
}

// TaskRowProps interface defining the props passed to the TaskRow component
interface TaskRowProps {
  task: Task;
  taskProgress: { [taskId: number]: number };
  onChange: (
    id: number,
    status: string,
    name: string,
    time: string,
    comment: string
  ) => void;
  onDelete: (taskId: number, taskTitle: string) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  taskProgress,
  onChange,
  onDelete,
}) => {
  // Event handler for status change
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const { value: status } = e.target;
    const { title, timeTracking, comment } = task;
    onChange(id, status, title, timeTracking.toString(), comment);
  };

  // Event handler for task deletion
  const handleDelete = () => {
    onDelete(task.id, task.title);
  };

  return (
    <tr>
      {/* Task ID */}
      <td>{task.id}</td>
      {/* Task Title */}
      <td>{task.title}</td>
      {/* Task Status */}
      <td>
        <select value={task.status} onChange={(e) => handleChange(e, task.id)}>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
      </td>
      {/* Task Progress */}
      <td>
        <div className="progress-bar">
          <div
            className={`progress ${
              taskProgress[task.id] === 100 ? "bg-green-500" : ""
            }`}
            style={{ width: `${taskProgress[task.id]}%` }}
          ></div>
        </div>
      </td>
      {/* Task Comment */}
      <td className="py-3 px-4 border-b">
        {task.comment !== "" ? (
          <span>{task.comment}</span>
        ) : (
          <span className="no-comment">No comment</span>
        )}
      </td>
      {/* Task Time Created */}
      <td>{task.timeTracking}</td>
      {/* Delete Task */}
      <td>
        <button onClick={handleDelete} className="text-red-500">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
