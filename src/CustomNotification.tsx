import React from "react";

interface NotificationProps {
  message: string;
  type: string;
  timestamp: string;
}

const CustomNotification: React.FC<NotificationProps> = ({
  message,
  type,
  timestamp,
}) => {
  let notificationClass = "";

  if (type === "success") {
    notificationClass = "bg-green-500 text-white";
  } else if (type === "warning") {
    notificationClass = "bg-yellow-500 text-black";
  }

  return (
    <div className={`notification p-4 ${notificationClass}`}>
      <p className="notification-message">{message}</p>
      <span className="notification-timestamp">{timestamp}</span>
    </div>
  );
};

export default CustomNotification;
