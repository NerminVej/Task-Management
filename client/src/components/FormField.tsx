import React, { ChangeEvent } from "react";

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange }) => (
  <div>
    <label htmlFor={label} className="block text-primary mb-1">
      {label}
    </label>
    <input
      id={label}
      type={type}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full"
    />
  </div>
);

export default FormField;
