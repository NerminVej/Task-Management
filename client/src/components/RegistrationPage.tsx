import React, { useState, ChangeEvent, FormEvent } from "react";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import LoginPage from "./LoginPage";
import { signup, login } from "../config/api";
import FormField from "./FormField";

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);

  const handleSignup = () => {
    if (
      isEmailValid(email) &&
      (checkPasswordStrength(password) === "good" ||
        checkPasswordStrength(password) === "strong")
    ) {
      signup(name, email, password)
        .then((response) => {
          console.log("Signup successful");
          handleLogin();
        })
        .catch((error) => {
          console.error("Signup failed:", error);
        });
    } else {
      console.log("Invalid Credentials");
    }
  };

  const handleLogin = () => {
    login(email, password)
      .then(() => {
        console.log("Login successful");
        window.location.reload(); // Refresh the page to log in the user
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    const passwordStrength = checkPasswordStrength(newPassword);
    setPasswordStrength(passwordStrength);
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

  const updatePasswordStrengthIndicator = (strength: string) => {
    return <PasswordStrengthIndicator strength={strength} />;
  };

  const checkPasswordStrength = (password: string): string => {
    // Define your criteria for password strength
    const weakRegex = /^(?=.*[A-Za-z]).{6,}$/;
    const goodRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    const strongRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).{10,}$/;
  
    if (strongRegex.test(password)) {
      return "strong";
    } else if (goodRegex.test(password)) {
      return "good";
    } else if (weakRegex.test(password)) {
      return "weak";
    } else {
      return ""; // or handle the case when the password doesn't meet any criteria
    }
  };
  

  const isEmailValid = (email: string): boolean => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleFormSubmit} className="p-4 bg-white rounded-md shadow-md">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Sign up for the Task Management Application
          </h1>

          <FormField label="Name" type="text" value={name} onChange={handleNameChange} />
          <FormField label="Email" type="email" value={email} onChange={handleEmailChange} />
          <FormField label="Password" type="password" value={password} onChange={handlePasswordChange} />
          <FormField
            label="Confirm Password"
            type="password"
            value={repeatedPassword}
            onChange={handleRepeatedPasswordChange}
          />

          {passwordStrength && (
            <div className="my-4">
              {updatePasswordStrengthIndicator(passwordStrength)}
            </div>
          )}
          

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primary text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-opacity-90"
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
                className="bg-secondary text-white font-medium px-8 py-2 rounded-md shadow-md hover:bg-opacity-90 transition-colors duration-300 ease-in-out"
                onClick={handleLoginClick}
              >
                Log In Instead
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
