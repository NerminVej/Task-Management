import React, { useState, useEffect } from "react";
import CustomNotification from "./CustomNotification";

import { calculateProgress } from "../config/taskUtils";
import {
  handleDeleteTask,
  handleChange,
  updateTask,
  assignTask,
} from "./helper/ChangeFunctionHelper";

import TaskRow from "./TaskRow";
import {
  getTasksByUserId,
  getUserIdByEmail,
  deleteTask,
  updateTaskStatus,
} from "../config/api";
import "../styles/tailwind.css";
import "../styles/dashboardStyle.css";
import TableHeader from "./TableHeader";

interface Task {
  id: number;
  title: string;
  status: string;
  progress: number;
  comment: string;
  attachments: string[];
  timeTracking: number;
}

interface Notification {
  id: number;
  message: string;
  type: string;
  timestamp: string;
}

interface TaskCreationPageProps {
  email: string;
}

interface TaskData {
  id: number;
  name: string;
  status: string;
  time: string;
  userId: number;
  comment: string | null;
  attachments: string[] | null;
}

const TaskManagementDashboard: React.FC<TaskCreationPageProps> = ({
  email,
}) => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationTimeout, setNotificationTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [userId, setUserId] = useState<number>(1);
  // To track the progress of each task
  const [taskProgress, setTaskProgress] = useState<{
    [taskId: number]: number;
  }>({});

  useEffect(() => {
    // Fetch the user ID based on the email
    getUserIdByEmail(email)
      .then((response) => {
        const responseData = response.data;
        const userId = responseData;
  
        if (userId) {
          setUserId(userId);
          console.log("The user id is: " + userId);
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
  }, [email, userId]);
  
  /*
  // Gets the userID when the page loads. We need it for our backend.
  useEffect(() => {
    // Fetch the user ID based on the email
    getUserIdByEmail(email)
      .then((response) => {
        const responseData = response.data;
        const userId = responseData;

        if (userId) {
          setUserId(userId);
          console.log("The user id is: " + userId);
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
  }, [email]);

  // Fetches all of our tasks that a user holds on the backend.
  useEffect(() => {
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
              // Responsible for handling that the progress bar gets changed when logging in.
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
  }, [userId]);
  */

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

          // Send PUT request to update task status
          updateTaskStatus(
            userId,
            task.id,
            status,
            taskData.name,
            taskData.time,
            taskData.comment
          )
            .then(() => {
              // Update the task status and progress in the state
              const updatedTask = { ...task, status, progress };
              setTaskProgress((prevProgress) => ({
                ...prevProgress,
                [id]: progress,
              }));

              // Add a notification when the status is changed
              addNotification(
                `Task "${taskData.name}" status changed to ${status}.`,
                "success",
                taskData.name
              );
              return updatedTask;
            })
            .then((updatedTask) => {
              // Update the task status in the state
              setTaskList((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? updatedTask : task))
              );
            })
            .catch((error) => {
              console.error("Failed to update task status:", error);
              return task;
            });
        }
        return task;
      })
    );
  };

    /*
  const assignTask = () => {
    const assignedTask = {
      id: Date.now(),
      title: "New Task",
      status: "Pending",
      progress: 0,
      comment: "",
      attachments: [],
      timeTracking: 0,
    };

    setTaskList((prevTasks) => [...prevTasks, assignedTask]);
    addNotification("Task assigned to you.", "info", assignedTask.title);
  };
  */

  /*

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
    addNotification("Task updated.", "success", "Updated Task");
  };

  */

  // Assuming you have access to the `taskData` object
  /*
  const handleChange = (
    id: number,
    status: string,
    name: string,
    time: string,
    comment: string
  ) => {
    const taskData = {
      name: name,
      time: time,
      comment: comment,
    };
    handleStatusChange(id, status, taskData);
  };*/

  /*
  function handleDeleteTask(taskId: number, taskTitle: string): void {
    // Call the deleteTask function from the API file
    deleteTask(userId, taskId)
      .then((response) => {
        // Remove the task from the task list
        setTaskList((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
        // Show a notification for successful deletion
        addNotification(`Task "${taskTitle}" deleted.`, "success", taskTitle);
        // Set a timeout to remove the notification after 5 seconds
        const timeoutId = setTimeout(() => {
          setNotifications((prevNotifications) =>
            prevNotifications.filter(
              (notification) => notification.message !== "Task deleted."
            )
          );
        }, 5000);

        // Store the timeoutId in state to clear it later if needed
        setNotificationTimeout(timeoutId);
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
        // Show a notification for failed deletion
        addNotification(
          `Failed to delete task "${taskTitle}".`,
          "error",
          taskTitle
        );
      });
  }*/

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
    </div>
  );
};

export default TaskManagementDashboard;
