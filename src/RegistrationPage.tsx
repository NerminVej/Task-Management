import React, { useState, ChangeEvent, FormEvent } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordStrength = checkPasswordStrength(password);
    if (passwordStrength === "weak") {
      console.log("Weak password! Please choose a stronger password.");
    } else {
      // If it is a valid email then it should submit the form
      if (isEmailValid(email)) {
        console.log("Form submitted successfully");
      } else {
        console.log("Invalid Email address entered. Please enter a real one.");
      }
    }
    
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // We check the password strength here
    const passwordStrength = checkPasswordStrength(newPassword);
    // Call the updater function to update the visual indicator.
    setPasswordStrength(passwordStrength);
    updatePasswordStrengthIndicator(passwordStrength);
  };
  const handleRepeatedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatedPassword(e.target.value);
  };

  function updatePasswordStrengthIndicator(strength: string) {}

  function checkPasswordStrength(password: string): string {
    if (password.length < 4) {
      return "nonexistent";
    } else if (password.length < 8) {
      return "weak";
    } else if (password.length <= 12) {
      return "good";
    } else if (password.length > 12) {
      return "optimal";
    } else {
      return "error";
    }
  }

  function isEmailValid(email: string): boolean {
    // regex to validate if an email address is valid or not.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleFormSubmit}
        className="p-4 bg-white rounded-md shadow-md"
      >
        <div className="space-y-4">
          <h1 className="text-accent text-center">
            Login for the Task Management Application
          </h1>

          <div>
            <label htmlFor="name" className="block font-medium text-primary">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="input input-bordered bg-gray-100 focus:ring-secondary text-secondary border-secondary rounded-md px-4 py-2 "
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-primary">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input input-bordered bg-gray-100 focus:ring-indigo-500 text-secondary border-secondary rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-primary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered bg-gray-100 focus:ring-indigo-500 text-secondary border-secondary rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-medium text-primary"
            >
              Confirm Password
            </label>
            <input
              id="password"
              type="password"
              value={repeatedPassword}
              onChange={handleRepeatedPasswordChange}
              className="input input-bordered bg-gray-100 focus:ring-indigo-500 text-secondary border-secondary rounded-md px-4 py-2"
            />
            <div className="top-2">
              <PasswordStrengthIndicator strength={passwordStrength} />
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-secondary text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-opacity-90"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
