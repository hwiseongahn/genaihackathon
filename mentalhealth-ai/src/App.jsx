import { useState } from "react";
import "./App.css";
import Survey from "./components/Survey.jsx";
import TasksSurvey from "./components/TasksSurvey.jsx";
import DayPlanner from "./components/DayPlanner.jsx";

function App() {

  return (
    <>
      <DayPlanner />
      {/* <TasksSurvey /> */}
    </>
  );
}

export default App;
