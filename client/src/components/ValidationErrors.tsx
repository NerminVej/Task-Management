import React from "react";

interface ValidationErrorsProps {
  errors: string[];
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
  return (
    <div className="mb-4">
      {errors.map((error, index) => (
        <p key={index} className="text-red-500">
          {error}
        </p>
      ))}
    </div>
  );
};

export default ValidationErrors;
