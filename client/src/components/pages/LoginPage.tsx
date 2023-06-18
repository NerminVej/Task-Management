import React, { useState, ChangeEvent, FormEvent } from "react";
import { login } from "../../config/api";
import TaskCreationPage from "./TaskCreationPage";
import TaskManagementDashboard from "./TaskManagementDashboard";
import RegistrationPage from "./RegistrationPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/taskCreationStyling.css";
import { Provider } from "react-redux";
import store from "../../store";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  // State variables
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const [showTaskCreationPage, setShowTaskCreationPage] = useState(false);
  const [showRegistrationPage, setShowRegistrationPage] = useState(false);

  // Event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Perform login request using the login function
      const response = await login(loginForm.email, loginForm.password);

      if (response.status === 200) {
        // Login successful, perform any necessary actions (e.g., redirect to dashboard)
        toast.success("Login Successful"); // Display success toast
        console.log("Login successful");
        setLoggedInEmail(loginForm.email); // Store the logged-in email
        setShowTaskCreationPage(true); // Show the TaskCreationPage
      } else {
        // Login failed, display an error message or handle the failure appropriately
        toast.error("Login Failed"); // Display error toast
        console.log("Login failed");
      }
    } catch (error) {
      toast.error("Error occurred during login"); // Display error toast
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
    <div className="flex flex-container">
      {/* Render the login form if not logged in and not on the registration page */}
      {!loggedInEmail && !showRegistrationPage && (
        <form
          onSubmit={handleFormSubmit}
          className="p-4 bg-white rounded-md shadow-md"
        >
          <div className="space-y-4">
            <h1 className="form-title">
              Login for the Task Management Application
            </h1>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-secondary form-button">
                Login
              </button>
            </div>
            <p className="flex justify-center">Or do you want to Sign Up?</p>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSignUpClick}
                className="form-button bg-primary"
              >
                Sign Up Instead
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Render the registration page if showRegistrationPage is true */}
      {showRegistrationPage && <RegistrationPage />}

      {/* Render the dashboard and task creation page if logged in */}
      {loggedInEmail && showTaskCreationPage && (
        <div>
          <TaskManagementDashboard email={loggedInEmail as string} />
          <div className="flex flex-col items-center mt-4">
            <TaskCreationPage email={loggedInEmail as string} />

            <button
              type="button"
              className="bg-red-500 form-button rounded-md shadow-md hover:bg-red-600"
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
