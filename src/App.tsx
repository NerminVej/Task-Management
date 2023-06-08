import React from "react";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import TaskCreationPage from "./TaskCreationPage";


function App() {
  return (
    <div className="App">
      <TaskCreationPage></TaskCreationPage>
      <LoginPage></LoginPage>
      <RegistrationPage></RegistrationPage>
    </div>
  );
}

export default App;
