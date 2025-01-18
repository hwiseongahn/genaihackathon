import React from "react";

const TaskList = ({tasks}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column align-items-start">
        <h4><b>Task List</b></h4>
        <p className="text-muted">Manage your tasks for the day</p>
        </div>
        <div className="">
          <ul className="list-group list-group-flush">
            {
              tasks.map((task, index) => (
                <li className="list-group-item p-1" key={index}>
                    <div className="d-flex justify-content-start">
                    {task.activityName}
                    </div>
                  
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
