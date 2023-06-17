import React from "react";

interface NotificationProps {
  message: string;
  type: string;
  timestamp: string;
}

/**
 * Renders a custom notification based on the provided props.
 *
 * @param message - The message of the notification.
 * @param type - The type of the notification.
 * @param timestamp - The timestamp of the notification.
 */
const CustomNotification: React.FC<NotificationProps> = ({
  message,
  type,
  timestamp,
}) => {
  let notificationClass = "";

  // Set the CSS class based on the notification type
  if (type === "success") {
    notificationClass = "alert alert-info";
  }

  return (
    <div className={notificationClass + " mb-4"}>
      {type === "success" && (
        <>
          {/* Render a success icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex flex-col items-center">
            {/* Render the message and timestamp */}
            <span>{message}</span>
            <span>{timestamp}</span>
          </div>
        </>
      )}
      {type !== "success" && <span>{message}</span>}
    </div>
  );
};

export default CustomNotification;
