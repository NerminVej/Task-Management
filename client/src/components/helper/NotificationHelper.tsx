import React from 'react';

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
