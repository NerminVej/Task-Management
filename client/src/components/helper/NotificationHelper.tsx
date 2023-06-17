import React from "react";

type Notification = {
  id: number;
  message: string;
  type: string;
  timestamp: string;
};

type AssignedTask = {
  id: number;
  title: string;
  status: string;
  progress: number;
  comment: string;
  attachments: never[];
  timeTracking: number;
};

/**
 * Adds a new notification to the array of notifications.
 * If a notification with the same message already exists, it does not add a duplicate notification.
 * The notification is automatically removed after 5 seconds.
 *
 * @param message - The message of the notification.
 * @param type - The type of the notification.
 * @param taskTitle - The title of the task associated with the notification.
 * @param assignedTask - The assigned task object.
 * @param setNotifications - The state setter function for the notifications array.
 * @param prevNotifications - The previous notifications array.
 * @returns The updated notifications array.
 */
export const addNotification = (
  message: string,
  type: string,
  taskTitle: string,
  assignedTask: AssignedTask,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
  prevNotifications: Notification[]
): Notification[] => {
  const newNotification: Notification = {
    id: Date.now(),
    message,
    type,
    timestamp: new Date().toLocaleString(),
  };

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
};
