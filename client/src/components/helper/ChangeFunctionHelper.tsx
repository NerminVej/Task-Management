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

  setTaskList((prevTasks) => [...prevTasks, assignedTask]); // Add the assigned task to the task list
  addNotification("Task assigned to you.", "info", assignedTask.title); // Notify about the task assignment
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
  addNotification("Task updated.", "success", "Updated Task"); // Notify about the task update
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
  handleStatusChange(id, status, taskData); // Handle the status change
}

export function handleDeleteTask(
  userId: number,
  taskId: number,
  taskTitle: string,
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  addNotification: (message: string, type: string, taskTitle: string) => void,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
  setNotificationTimeout: React.Dispatch<
    React.SetStateAction<NodeJS.Timeout | null>
  >
) {
  deleteTask(userId, taskId)
    .then((response) => {
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
      addNotification(`Task "${taskTitle}" deleted.`, "success", taskTitle); // Notify about the task deletion
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
      ); // Notify about the task deletion failure
    });
}
