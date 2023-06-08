import React, { useState, ChangeEvent, FormEvent } from "react";

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

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", loginForm);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <form
        onSubmit={handleFormSubmit}
        className="p-4 bg-white rounded-md shadow-md"
      >
        <div className="space-y-4">
          <h1 className="text-accent text-center">
            Login for the Task Management Application
          </h1>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-primary text-left"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleInputChange}
              className="input input-bordered bg-gray-100 focus:ring-indigo-500 text-secondary border-secondary rounded-md px-20 py-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-primary text-left"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              className="input input-bordered bg-gray-100 focus:ring-indigo-500 text-secondary border-secondary rounded-md py-2 px-20"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-primary text-white font-medium px-20 py-2 rounded-md shadow-md hover:bg-opacity-90 "
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
