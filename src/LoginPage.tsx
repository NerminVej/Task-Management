import React, { useState, ChangeEvent, FormEvent } from "react";

// Defining the shape of the LoginForm data where we need email and password.
interface LoginForm {
  email: string;
  password: string;
}

// React.FC to signal that it is a funcitonal component.
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
    // Perform login logic with loginForm.email and loginForm.password
    console.log("Form submitted:", loginForm);
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginForm.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
