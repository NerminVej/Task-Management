import React, { ChangeEvent } from "react";

interface FormFieldProps {
  label: string; // Represents the label for the form field
  type: string; // Represents the type of the input field (e.g., "text", "password")
  value: string; // Represents the current value of the input field
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Event handler for input field value changes
}

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange }) => (
  <div>
    <label htmlFor={label} className="block text-primary mb-1">
      {label} {/* Displays the label text */}
    </label>
    <input
      id={label} // Sets the ID of the input field to match the label's "for" attribute
      type={type} // Sets the type of the input field
      value={value} // Binds the value of the input field to the "value" prop
      onChange={onChange} // Sets the event handler for input field value changes
      className="input input-bordered w-full" // Applies CSS classes to the input field for styling
    />
  </div>
);

export default FormField;
