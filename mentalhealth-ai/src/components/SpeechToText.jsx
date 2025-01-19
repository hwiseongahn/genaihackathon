import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRegnitionHook";
import { FaMicrophone } from "react-icons/fa";
import {
  getActionPlan,
  getTasksFromGemini,
} from "../controllers/GeminiController";

const SpeechToText = () => {
  const {
    isListening,
    hasRecognitionSupport,
    startListening,
    stopListening,
    textArray,
  } = useSpeechRecognition();

  const [plan, setPlan] = useState();
  const [planLoaded, setPlanLoaded] = useState(false);
  const [actionPlanTask, setActionPlanTask] = useState();
  const [scheduleInfo, setScheduleInfo] = useState();
  const [taskList, setTaskList] = useState();

  const createGeminiRequest = async () => {
    try {
      const res = await getTasksFromGemini(textArray);
      setPlan(res);
      setPlanLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const generateActionPlan = async (task) => {
    setActionPlanTask();
    const plan = await getActionPlan(task);
    setActionPlanTask(plan);
  };

  return (
    <div className="w-100 h-100 d-flex align-items-center">
      {!planLoaded ? (
        hasRecognitionSupport ? (
          <div className="row w-100 d-flex justify-content-center">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="text-center mb-3">
                    <b>Speech to Task</b>
                  </h5>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <button
                      className={`btn ${
                        isListening ? "btn-danger" : "btn-dark"
                      }  btn-block btn-lg`}
                      onClick={isListening ? stopListening : startListening}
                    >
                      {isListening ? "Stop Listening" : "Start Listening"}
                      <FaMicrophone />
                    </button>

                    {isListening && (
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        <p className="m-0">Listening...</p>
                      </div>
                    )}
                    <div className="mt-3">
                      <h5 className="">Text:</h5>
                      <ul className="list-group">
                        {textArray.map((text, index) => (
                          <li key={index} className="list-group-item">
                            {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="btn btn-info btn-block"
                      onClick={createGeminiRequest}
                    >
                      Create Tasks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Browser does not support Speech Recognition</p>
        )
      ) : (
        <div className="row w-100 d-flex justify-content-center">
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <h5 className="text-center mb-3">
                  <b>Day Schedule</b>
                </h5>
                <ul className="list-group">
                  {plan.tasks.map((task, index) => (
                    <li key={index} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <p className="m-0">
                          <b>{task.task_name}</b>
                        </p>
                        <p className="m-0">
                          <b>{task.time}</b>
                        </p>
                        <p
                          className={`${
                            task.priority == "High"
                              ? "bg-danger"
                              : task.priority == "Medium"
                              ? "bg-warning"
                              : "bg-success"
                          } p-1 rounded-lg`}
                        >
                          <b>{task.priority}</b>
                        </p>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => generateActionPlan(task)}
                        >
                          Generate Action Plan
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {actionPlanTask && (
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="text-center mb-3">
                    <b>Action Plan - {actionPlanTask.task_name}</b>
                  </h5>
                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <ol className="list-group">
                      {actionPlanTask.steps.map((task, index) => (
                        <li key={index} className="list-group-item">
                          <div className="d-flex justify-content-between">
                            <p className="m-0">
                              <b>{task.description}</b>
                            </p>
                            <p className="m-0">
                              <b>{task.estimated_time}</b>
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SpeechToText;
