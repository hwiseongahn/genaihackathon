import React from "react";
import { FaMagic } from "react-icons/fa";
const Schedule = ({ plan, generateActionPlan }) => {
  return (
    <div className="card ">
      <div className="card-body">
        <h5 className="text-center mb-3">
          <b>Day Schedule</b>
        </h5>
        <ul className="list-group text-dark">
          {plan.tasks.map((task, index) => (
            <li key={index} className={`list-group-item`}>
              <div className="row">
                <div className="col-3">
                  <p className="m-0">
                    <b>{task.task_name}</b>
                  </p>
                </div>
                <div className="col-3">
                  <p className="m-0">
                    <b>{task.time}</b>
                  </p>
                </div>
                <div className="col-3">
                  <p
                    className={`${
                      task.priority == "High"
                        ? "bg-danger"
                        : task.priority == "Medium"
                        ? "bg-warning"
                        : task.type == "Relax"
                        ? "bg-light"
                        : "bg-success"
                    } p-1 rounded-lg text-center`}
                  >
                    <b>{task.type == "Work" ? task.priority : "Relax"}</b>
                  </p>
                </div>
                <div className="col-3">
                  {task.type == "Work" && (
                    <button
                      className="btn btn-outline-dark btn-block"
                      onClick={() => generateActionPlan(task)}
                    >
                      Plan <FaMagic />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Schedule;
