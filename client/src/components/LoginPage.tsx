import React, { useState, ChangeEvent, FormEvent } from "react";
import { login } from "../config/api";
import TaskCreationPage from "./TaskCreationPage";
import TaskManagementDashboard from "./TaskManagementDashboard";
import RegistrationPage from "./RegistrationPage";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const [showTaskCreationPage, setShowTaskCreationPage] = useState(false);
  const [showRegistrationPage, setShowRegistrationPage] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", loginForm);

    try {
      // Perform login request using the login function
      const response = await login(loginForm.email, loginForm.password);

      if (response.status === 200) {
        // Login successful, perform any necessary actions (e.g., redirect to dashboard)
        console.log("Login successful");
        setLoggedInEmail(loginForm.email); // Store the logged-in email
        setShowTaskCreationPage(true); // Show the TaskCreationPage
      } else {
        // Login failed, display an error message or handle the failure appropriately
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  const handleSignUpClick = () => {
    setShowRegistrationPage(true); // Show the RegistrationPage
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationPage(false); // Hide the RegistrationPage
  };

  const handleLogout = () => {
    setLoggedInEmail(null); // Clear the logged-in email
    setShowTaskCreationPage(false); // Hide the TaskCreationPage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!loggedInEmail && !showRegistrationPage && (
        <form
          onSubmit={handleFormSubmit}
          className="p-4 bg-white rounded-md shadow-md"
        >
          <div className="space-y-4">
            <h1 className="text-center text-gray-800">
              Login for the Task Management Application
            </h1>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary text-left"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                className="input input-bordered w-full px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary text-left"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="input input-bordered w-full px-4 py-2"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary text-white font-medium px-8 py-2 rounded-md shadow-md hover:bg-opacity-90 transition-colors duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
            <p className="flex justify-center">Or do you want to Sign Up?</p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSignUpClick}
                className="bg-primary text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-opacity-90"
              >
                Sign Up Instead
              </button>
            </div>
          </div>
        </form>
      )}

      {showRegistrationPage && <RegistrationPage />}

      {loggedInEmail && showTaskCreationPage && (
  <div>
    <TaskManagementDashboard email={loggedInEmail as string} />
    <div className="flex flex-col items-center mt-4">
      <TaskCreationPage email={loggedInEmail as string} />

      <button
        type="button"
        className="btn bg-red-500 text-white font-medium px-4 py-2 mt-4 rounded-md shadow-md hover:bg-red-600"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default LoginPage;
