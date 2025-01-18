import React from "react";
import { useState } from "react";
import { getPlannerData } from "../controllers/GeminiController";
import TaskList from "./TaskList";
import Schedule from "./Schedule";

const DayPlanner = () => {
  const [plannerInfo, setPlannerInfo] = useState();
  const getDayPlannerInfo = async () => {
    const res = await getPlannerData();
    console.log(res);
    setPlannerInfo(res.dailyPlan);
  };
  return (
    <div className="container">
        <div className="row d-flex justify-content-center mb-3">
        <button className="btn btn-primary" onClick={getDayPlannerInfo}>
        Get Info
      </button>
        </div>
     
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-4">
          {plannerInfo && <TaskList tasks={plannerInfo} />}
        </div>
        <div className="col-6">
          {plannerInfo && <Schedule tasks={plannerInfo} />}
        </div>
      </div>
    </div>
  );
};

export default DayPlanner;
