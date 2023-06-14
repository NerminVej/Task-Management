import React, { useState, ChangeEvent, FormEvent } from "react";
import { login } from "../config/api";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

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
        // Perform the necessary action after successful login
      } else {
        // Login failed, display an error message or handle the failure appropriately
        console.log("Login failed");
        // Perform the necessary action after failed login
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
              className="btn bg-primary text-white font-medium px-4 py-2 rounded-md shadow-md hover:bg-opacity-90"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
