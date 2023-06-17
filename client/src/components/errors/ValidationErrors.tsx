import React from "react";

interface ValidationErrorsProps {
  errors: string[]; // Array of validation errors to be displayed
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
  return (
    <div className="mb-4">
      {errors.map((error, index) => (
        <p key={index} className="text-red-500">
          {error} {/* Displays the validation error message */}
        </p>
      ))}
    </div>
  );
};

export default ValidationErrors;
