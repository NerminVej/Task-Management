import React from "react";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import TaskCreationPage from "./components/TaskCreationPage";
import TaskManagementDashboard from "./components/TaskManagementDashboard";


function App() {
  return (
    <div className="App">
      <TaskManagementDashboard></TaskManagementDashboard>
      <TaskCreationPage></TaskCreationPage>
      <LoginPage></LoginPage>
      <RegistrationPage></RegistrationPage>
    </div>
  );
}

export default App;
