import { useState } from "react";
import { calculateProgress } from "../../config/taskUtils";
import {
  getTasksByUserId,
  getUserIdByEmail,
  deleteTask,
  updateTaskStatus,
} from "../../config/api";

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

export function addNotification(
  message: string,
  type: string,
  taskTitle: string,
  notifications: Notification[],
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) {
  const newNotification: Notification = {
    id: Date.now(),
    message,
    type,
    timestamp: new Date().toLocaleString(),
  };

  setNotifications((prevNotifications) => {
    const existingNotification = prevNotifications.find(
      (notification) => notification.message === message
    );

    if (existingNotification) {
      return prevNotifications;
    } else {
      const updatedNotifications = [...prevNotifications, newNotification];
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
}

export function assignTask(
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  addNotification: (message: string, type: string, taskTitle: string) => void
) {
  const assignedTask: Task = {
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
}

export function updateTask(
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  addNotification: (message: string, type: string, taskTitle: string) => void
) {
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
}

export function handleStatusChange(
  id: number,
  status: string,
  taskData: { name: string; time: string; comment: string },
  userId: number,
  taskList: Task[],
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  setTaskProgress: React.Dispatch<React.SetStateAction<{ [taskId: number]: number }>>,
  addNotification: (message: string, type: string, taskTitle: string) => void
) {
  setTaskList((prevTasks) =>
    prevTasks.map((task) => {
      if (task.id === id && task.status !== status) {
        const progress = calculateProgress(status);

        updateTaskStatus(
          userId,
          task.id,
          status,
          taskData.name,
          taskData.time,
          taskData.comment
        )
          .then(() => {
            const updatedTask = { ...task, status, progress };
            setTaskProgress((prevProgress) => ({
              ...prevProgress,
              [id]: progress,
            }));
            addNotification(
              `Task "${taskData.name}" status changed to ${status}.`,
              "success",
              taskData.name
            );
            return updatedTask;
          })
          .then((updatedTask) => {
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
}

export function handleChange(
  id: number,
  status: string,
  name: string,
  time: string,
  comment: string,
  handleStatusChange: (
    id: number,
    status: string,
    taskData: { name: string; time: string; comment: string }
  ) => void
) {
  const taskData = {
    name: name,
    time: time,
    comment: comment,
  };
  handleStatusChange(id, status, taskData);
}

export function handleDeleteTask(
  userId: number,
  taskId: number,
  taskTitle: string,
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  addNotification: (message: string, type: string, taskTitle: string) => void,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
  setNotificationTimeout: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>
) {
  deleteTask(userId, taskId)
    .then((response) => {
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
      addNotification(`Task "${taskTitle}" deleted.`, "success", taskTitle);
      const timeoutId = setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.message !== "Task deleted."
          )
        );
      }, 5000);
      setNotificationTimeout(timeoutId);
    })
    .catch((error) => {
      console.error("Failed to delete task:", error);
      addNotification(
        `Failed to delete task "${taskTitle}".`,
        "error",
        taskTitle
      );
    });
}
