import React from "react";

const PasswordStrengthIndicator: React.FC<{ strength: string }> = ({
  strength,
}) => {
  let progressValue = 0;

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
