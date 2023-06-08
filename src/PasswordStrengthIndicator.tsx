import React from "react";

const PasswordStrengthIndicator: React.FC<{ strength: string }> = ({
  strength,
}) => {
  if (strength === "weak") {
    return (
      <div>
        <h1>Password Strength {strength}</h1>
        <progress
          className="progress progress-accent w-56"
          value="20"
          max="100"
        ></progress>
      </div>
    );
  } else if (strength === "good") {
    return (
      <div>
        <h1>Password Strength {strength}</h1>
        <progress
          className="progress progress-accent w-56"
          value="50"
          max="100"
        ></progress>
      </div>
    );
  } else if (strength === "optimal") {
    return (
      <div>
        <h1>Password Strength {strength}</h1>

        <progress
          className="progress progress-accent w-56"
          value="70"
          max="100"
        ></progress>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Password Strength {strength}</h1>
        <progress
          className="progress progress-accent w-56"
          value="0"
          max="100"
        ></progress>
      </div>
    );
  }
};

export default PasswordStrengthIndicator;
