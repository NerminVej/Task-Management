import React, { useState, ChangeEvent, FormEvent } from "react";

const RegistrationPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission and validation here
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form onSubmit={handleFormSubmit} className="p-4 bg-white rounded-md shadow-md">
        <div className="space-y-4">
          <h1 className="text-accent text-center">Login for the Task Management Application</h1>

          <div>
            <label htmlFor="name" className="block font-medium text-primary">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="input input-bordered focus:ring-secondary text-secondary border-secondary rounded-md px-4 py-2"
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
              className="input input-bordered focus:ring-indigo-500 text-secondary border-secondary rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-primary">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered focus:ring-indigo-500 text-secondary border-secondary rounded-md px-4 py-2"
            />
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
