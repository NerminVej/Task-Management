import React, { useState, ChangeEvent, FormEvent } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import LoginPage from "./LoginPage";
import { signup } from "../config/api";

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);

  // Function that handles the signup
  const handleSignup = () => {
    // Check if the email is a valid email.
    if (
      isEmailValid(email) &&
      (checkPasswordStrength(password) === "good" ||
        checkPasswordStrength(password) === "strong")
    ) {
      signup(name, email, password)
        .then((response) => {
          console.log("Signup successful");
        })
        .catch((error) => {
          console.error("Signup failed:", error);
        });
    } else {
      console.log("Invalid Credentials");
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call the handleSignup function so that if the signup button gets hit that the function gets triggered.
    handleSignup();
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

  const handleLoginClick = () => {
    setShowLoginPage(true);
  };

  if (showLoginPage) {
    return <LoginPage />;
  }

  function updatePasswordStrengthIndicator(strength: string) {}

  // This is the password strength checker. We can improve upon this
  // We can set up more validations and give the user inputs to what is missing inside of the password.
  function checkPasswordStrength(password: string): string {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (password.length < 8) {
      return "weak";
    } else if (
      password.length >= 8 &&
      password.length <= 12 &&
      hasSpecialChar &&
      hasNumber &&
      (hasLowerCase || hasUpperCase)
    ) {
      return "good";
    } else if (
      password.length > 12 &&
      hasSpecialChar &&
      hasNumber &&
      hasLowerCase &&
      hasUpperCase
    ) {
      return "strong";
    } else {
      return "invalid";
    }
  }

  function isEmailValid(email: string): boolean {
    // regex to validate if an email address is valid or not.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="p-4 bg-white rounded-md shadow-md"
      >
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Sign up for the Task Management Application
          </h1>

          <div>
            <label htmlFor="name" className="block text-primary mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-primary mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-primary mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label
              htmlFor="repeatedPassword"
              className="block text-primary mb-1"
            >
              Confirm Password
            </label>
            <input
              id="repeatedPassword"
              type="password"
              value={repeatedPassword}
              onChange={handleRepeatedPasswordChange}
              className="input input-bordered w-full"
            />
            <div className="top-2">
              <PasswordStrengthIndicator strength={passwordStrength} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn bg-primary text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-opacity-90"
            >
              Sign Up
            </button>

            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">
                Do you already have an account?{" "}
                <span
                  className="text-primary font-medium cursor-pointer"
                  onClick={handleLoginClick}
                >
                  Log in instead!
                </span>
              </p>
              <button
                type="button"
                className="btn bg-secondary text-white font-medium px-8 py-2 rounded-md shadow-md hover:bg-opacity-90 transition-colors duration-300 ease-in-out"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
