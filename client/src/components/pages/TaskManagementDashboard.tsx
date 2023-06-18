import React, { useState, useEffect, useContext, ReactNode } from "react";
import CustomNotification from "../notifications/CustomNotification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { calculateProgress } from "../../config/taskUtils";
import {
  handleDeleteTask,
  handleChange,
  updateTask,
  assignTask,
} from "../helper/ChangeFunctionHelper";

import TaskRow from "../tasks/TaskRow";
import {
  getTasksByUserId,
  getUserIdByEmail,
  deleteTask,
  updateTaskStatus,
} from "../../config/api";
import "../../styles/tailwind.css";
import "../../styles/dashboardStyle.css";
import TableHeader from "../tasks/TableHeader";

const MyTasksContext = React.createContext([]);

// Interface for a Task object
interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
  comment: string;
  attachments: string[];
  timeTracking: number;
}

// Interface for a Notification object
interface Notification {
  id: number;
  message: string;
  type: string;
  timestamp: string;
}

// Props interface for the TaskManagementDashboard component
interface TaskCreationPageProps {
  email: string;
}

// Interface for the data received from the API for a task
interface TaskData {
  id: number;
  name: string;
  status: string;
  time: string;
  userId: number;
  comment: string | null;
  attachments: string[] | null;
}

interface MyTasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface MyTasksProviderProps {
  children: ReactNode;
}

const TaskManagementDashboard: React.FC<TaskCreationPageProps> = ({
  email,
}) => {
  const [taskList, setTaskList] = useState<Task[]>([]); // State to store the list of tasks
  const [notifications, setNotifications] = useState<Notification[]>([]); // State to store the notifications
  const [notificationTimeout, setNotificationTimeout] =
    useState<NodeJS.Timeout | null>(null); // State to store the timeout for removing notifications
  const [userId, setUserId] = useState<number>(1); // State to store the user ID
  const [taskProgress, setTaskProgress] = useState<{
    [taskId: number]: number;
  }>(
    {} // State to track the progress of each task
  );

  const fetchTasks = () => {
    // Fetch the user ID based on the email
    getUserIdByEmail(email)
      .then((response) => {
        const responseData = response.data;
        const userId = responseData;

        if (userId) {
          setUserId(userId);
        } else {
          console.error(
            "Failed to get user ID. Invalid response:",
            responseData
          );
        }
      })
      .catch((error) => {
        console.error("Failed to get user ID:", error);
      });

    if (userId) {
      // Fetch tasks for the user
      getTasksByUserId(userId)
        .then((response) => {
          const tasksData = response.data;
          // Update task list by including the name property
          const updatedTaskList = tasksData.map((taskData: TaskData) => {
            const progress = calculateProgress(taskData.status);
            return {
              id: taskData.id,
              title: taskData.name,
              status: taskData.status,
              comment: taskData.comment || "",
              attachments: taskData.attachments,
              timeTracking: taskData.time,
              progress: progress,
            };
          });
          setTaskList(updatedTaskList);

          // Update the task progress
          const updatedTaskProgress: { [taskId: number]: number } = {};
          updatedTaskList.forEach((task: Task) => {
            updatedTaskProgress[task.id] = task.progress;
          });
          setTaskProgress(updatedTaskProgress);
        })
        .catch((error) => {
          console.error("Failed to get tasks:", error);
        });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [email, userId]);

  const handleReload = () => {
    fetchTasks();
  };

  const addNotification = (
    message: string,
    type: string,
    taskTitle: string
  ) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleString(),
    };

    setNotifications((prevNotifications) => {
      // Check if a notification with the same message already exists
      const existingNotification = prevNotifications.find(
        (notification) => notification.message === message
      );

      if (existingNotification) {
        // If the notification already exists, return the previous notifications array
        return prevNotifications;
      } else {
        // If the notification is new, add it to the notifications array
        const updatedNotifications = [...prevNotifications, newNotification];

        // Set a timeout to remove the notification after 5 seconds
        setTimeout(() => {
          setNotifications((prevNotifications) =>
            prevNotifications.filter(
              (notification) => notification.id !== newNotification.id
            )
          );
        }, 5000);

        return updatedNotifications;
      }
    });
  };

  const handleAssignTask = () => {
    assignTask(setTaskList, addNotification);
  };

  const handleUpdateTask = () => {
    updateTask(setTaskList, addNotification);
  };

  const handleStatusChange = (
    id: number,
    status: string,
    taskData: { name: string; time: string; comment: string }
  ) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id && task.status !== status) {
          const progress = calculateProgress(status);

          updateTaskStatusAndProgress(task, id, status, taskData, progress);

          updateNotificationAndToast(task, taskData, status);

          return { ...task, status, progress };
        }
        return task;
      })
    );
  };

  const updateTaskStatusAndProgress = (
    task: Task,
    id: number,
    status: string,
    taskData: { name: string; time: string; comment: string },
    progress: number
  ) => {
    updateTaskStatus(
      userId,
      id,
      status,
      taskData.name,
      taskData.time,
      taskData.comment
    )
      .then(() => {
        setTaskProgress((prevProgress) => ({
          ...prevProgress,
          [id]: progress,
        }));
      })
      .then(() => {
        setTaskList((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status, progress } : task
          )
        );
      })
      .catch((error) => {
        console.error("Failed to update task status:", error);
      });
  };

  const updateNotificationAndToast = (
    task: Task,
    taskData: { name: string; time: string; comment: string },
    status: string
  ) => {
    const toastMessage = `Task "${taskData.name}" status changed to ${status}.`;

    if (
      !notifications.some(
        (notification) => notification.message === toastMessage
      )
    ) {
      addNotification(toastMessage, "success", taskData.name);
      // If I want to add a toast message instead of my own Notification component.
      //toast.success(toastMessage);
    }
  };

  return (
    <div className="dashboard">
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
      <h1 className="dashboard-title">Task Management Dashboard</h1>
      <table className="dashboard-table">
        {/* Table Header */}
        <TableHeader></TableHeader>
        {/* Table Body */}
        <tbody>
          {taskList.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              taskProgress={taskProgress}
              onChange={(id, status, name, time, comment) =>
                handleChange(
                  id,
                  status,
                  name,
                  time,
                  comment,
                  handleStatusChange
                )
              }
              onDelete={() =>
                handleDeleteTask(
                  userId,
                  task.id,
                  task.title,
                  setTaskList,
                  addNotification,
                  setNotifications,
                  setNotificationTimeout
                )
              }
            />
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={handleReload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-8 text-lg"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default TaskManagementDashboard;
