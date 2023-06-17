import React from "react";

/**
 * Displays the strength of a password and renders a progress bar based on the provided strength value.
 *
 * @param strength - The strength of the password ("weak", "good", "strong").
 */
const PasswordStrengthIndicator: React.FC<{ strength: string }> = ({
  strength,
}) => {
  let progressValue = 0;

  // Set the progress value based on the provided strength
  if (strength === "weak") {
    progressValue = 20;
  } else if (strength === "good") {
    progressValue = 50;
  } else if (strength === "strong") {
    progressValue = 70;
  }

  return (
    <div>
      <h1>Password Strength {strength}</h1>
      <progress
        className="progress progress-accent w-56"
        value={progressValue}
        max="100"
      ></progress>
    </div>
  );
};

export default PasswordStrengthIndicator;
