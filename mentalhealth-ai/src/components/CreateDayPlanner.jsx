import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRegnitionHook";
import {
  FaClock,
  FaMagic,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import {
  getActionPlan,
  getTasksFromGemini,
} from "../controllers/GeminiController";
import SpeechToText from "./SpeechToText";
import Schedule from "./Schedule";

const CreateDayPlanner = () => {
  const {
    isListening,
    hasRecognitionSupport,
    startListening,
    stopListening,
    textArray,
  } = useSpeechRecognition();

  const [plan, setPlan] = useState();
  const [showPlan, setShowPlan] = useState(false);
  const [actionPlanTask, setActionPlanTask] = useState();
  const [loadingActionPlan, setIsLoadingActionPlan] = useState(false);
  const [loadingDayPlanner, setIsLoadingDayPlanner] = useState(false);

  const createGeminiRequest = async () => {
    try {
      setIsLoadingDayPlanner(true);
      const res = await getTasksFromGemini(textArray);
      setPlan(res);
      setShowPlan(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDayPlanner(false);
    }
  };

  const generateActionPlan = async (task) => {
    try {
      setIsLoadingActionPlan(true);
      setActionPlanTask();
      const plan = await getActionPlan(task);
      setActionPlanTask(plan);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingActionPlan(false);
    }
  };

  return (
    <div className="w-100 d-flex align-items-center">
      {!showPlan && !loadingDayPlanner ? (
        hasRecognitionSupport ? (
          <div className="row w-100 d-flex justify-content-center">
            <div className="col-5">
              <SpeechToText
                startListening={startListening}
                isListening={isListening}
                createGeminiRequest={createGeminiRequest}
                stopListening={stopListening}
                textArray={textArray}
              />
            </div>
          </div>
        ) : (
          <p>Browser does not support Speech Recognition</p>
        )
      ) : loadingDayPlanner ? (
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="m-0 ml-3">Generating Your Day Planner...</p>
        </div>
      ) : (
        <div className="row w-100 d-flex justify-content-center">
          <div className="col-lg-7 col-12 mt-5" style={{ maxHeight: "550px", overflowY: "auto" }}>
            {
              plan && <Schedule plan={plan} generateActionPlan={generateActionPlan} />
            }
          </div>
          {!loadingActionPlan ? (
            actionPlanTask && (
              <div className="col-lg-5 col-12 mt-5"style={{ maxHeight: "550px", overflowY: "auto" }}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="text-center mb-3">
                      <b>Action Plan - {actionPlanTask.task_name}</b>
                    </h5>
                    <div style={{ maxHeight: "440px", overflowY: "auto" }}>
                      <ol className="list-group">
                        {actionPlanTask.steps.map((task, index) => (
                          <li key={index} className="list-group-item">
                            <div className="row">
                              <div className="col-8">
                                <p className="m-0">
                                  <b>
                                    {task.step}. {task.description}
                                  </b>
                                </p>
                              </div>
                              <div className="col-4 ">
                                <p className="m-0 text-center">
                                  <FaClock className="mr-2" />
                                  <b>{task.estimated_time}</b>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div className="spinner-border mr-3" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="m-0">Generating Action Plan...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CreateDayPlanner;
