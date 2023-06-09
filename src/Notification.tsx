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
  return (
    <div className={`notification ${type}`}>
      <p className="notification-message">{message}</p>
      <span className="notification-timestamp">{timestamp}</span>
    </div>
  );
};

export default Notification;
