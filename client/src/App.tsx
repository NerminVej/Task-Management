import React from "react";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import TaskCreationPage from "./components/pages/TaskCreationPage";
import TaskManagementDashboard from "./components/pages/TaskManagementDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      {/* The ToastContainer component from the react-toastify library is used to display notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
        draggable
      />
      {/* The RegistrationPage component is rendered within the main App component */}
      <RegistrationPage></RegistrationPage>
    </div>
  );
}

export default App;
