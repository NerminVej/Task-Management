import React from "react";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import TaskCreationPage from "./TaskCreationPage";
import TaskManagementDashboard from "./TaskManagementDashboard";


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
