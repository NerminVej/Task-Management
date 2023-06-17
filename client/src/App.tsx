import React from "react";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import TaskCreationPage from "./components/TaskCreationPage";
import TaskManagementDashboard from "./components/TaskManagementDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
        draggable
      />
      <RegistrationPage></RegistrationPage>
    </div>
  );
}

export default App;
