import React, { useState } from "react";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and validation here
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-4">

      <div className="space-y-4 flex flex-col items-center justify-center">
        <div>
          <label htmlFor="name" className="block font-medium  text-primary">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered focus:ring-secondary text-secondary border-secondary"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium  text-primary">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered focus:ring-indigo-500 text-secondary border-secondary"
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
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered focus:ring-indigo-500 text-secondary border-secondary"
          />
        </div>

        <button
          type="submit"
          className="btn bg-secondary"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegistrationPage;
