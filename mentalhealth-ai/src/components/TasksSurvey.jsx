import React, { useState } from "react";
import logo from "../assets/favicon.svg";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function TasksSurvey({
  task,
  setTask,
  stress,
  setStress,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  tasks,
  setTasks,
  setShowTasks,
  setShowHobbies,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && stress && dueDate) {
      const newTask = {
        id: Date.now(),
        task: task,
        stress: parseInt(stress),
        priority: parseInt(priority),
        dueDate: dueDate,
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setStress("");
      setDueDate("");
    }
  };

  const handleSubmitTaskList = () => {
    setShowTasks(false);
    setShowHobbies(true);
  };

  //for now, we are just displaying the tasks
  console.log(tasks);

  return (
    <div className="container mt-5 vw-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">
                <b>Add Your Tasks Manually</b>
              </h3>
              <div className="w-100 d-flex justify-content-center">
                <img className="h-25 img-fluid" src={logo} alt="logo" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label htmlFor="task" className="form-label">
                      What's stressing you?
                    </label>
                    <input
                      type="text"
                      className="form-control border"
                      id="task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      placeholder="Enter your stressful task"
                      required
                    />
                  </div>
                  <div className="col-md-2 d-flex flex-column mr-2 p-0">
                    <label htmlFor="stress-level" className="form-label">
                      Stress Level
                    </label>
                    <select
                      className="form-select bg-white text-secondary flex-grow-1 rounded border"
                      id="stress-level"
                      value={stress}
                      onChange={(e) => setStress(e.target.value)}
                      required
                    >
                      <option value="">Select stress level</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 d-flex flex-column ml-2 p-0">
                    <label htmlFor="priority-level" className="form-label">
                      Priority Level
                    </label>
                    <select
                      className="form-select bg-white text-secondary flex-grow-1 rounded border"
                      id="stress-level"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      required
                    >
                      <option value="">Select priority level</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="due-date" className="form-label">
                      Enter due date:
                    </label>
                    <input
                      type="date"
                      className="form-control border"
                      id="due-date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      placeholder="Enter your due date"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <motion.button
                      type="submit"
                      className="btn btn-primary w-100 d-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{
                        scale: 0.9,
                        rotate: -5,
                      }}
                    >
                      Add task
                    </motion.button>
                  </div>
                  <div className="col-8">
                    <button
                      onClick={handleSubmitTaskList}
                      className="btn btn-primary w-100 d-block"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>

              {tasks.length > 0 && (
                <div className="mt-4 w-100">
                  <h3>Logged Tasks:</h3>
                  <ul className="list-group">
                    {tasks.map((t) => (
                      <li
                        key={t.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {t.task}
                        <span
                          className={`badge bg-${
                            t.stress <= 2
                              ? "success"
                              : t.stress <= 4
                              ? "warning"
                              : "danger"
                          } rounded-pill`}
                        >
                          Stress Level {t.stress}
                        </span>
                        <span
                          className={`badge bg-${
                            t.priority <= 2
                              ? "success"
                              : t.priority <= 4
                              ? "warning"
                              : "danger"
                          } rounded-pill`}
                        >
                          Priority Level {t.priority}
                        </span>
                        <span className="">Due Date: {t.dueDate}</span>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            setTasks(tasks.filter((task) => task.id !== t.id))
                          }
                        >
                          <FaTrashAlt />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center"></div>
        </div>
      </div>
    </div>
  );
}

export default TasksSurvey;
