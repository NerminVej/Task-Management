import React from "react";

interface NotificationProps {
  message: string;
  type: string;
  timestamp: string;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  timestamp,
}) => {
  let notificationClass = "";

  if (type === "info") {
    notificationClass = "notification-info";
  } else if (type === "success") {
    notificationClass = "notification-success";
  } else if (type === "warning") {
    notificationClass = "notification-warning";
  }

  return (
    <div className={`notification ${notificationClass}`}>
      <p className="notification-message">{message}</p>
      <span className="notification-timestamp">{timestamp}</span>
    </div>
  );
};

export default Notification;
