import React from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import logo from '../assets/favicon.svg';

const SpeechToText = ({
  startListening,
  isListening,
  stopListening,
  textArray,
  createGeminiRequest,
  addTasksManually
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-center ">
          <b>Speech to Task AI</b>
        </h3>
         <img className="h-25 d-inline-block img-fluid" src={logo} alt="logo" />
        <p className="text-muted text-center">
          Simply speak out the tasks that are stressing you out, and some activities that relax you, and see the
          magic happen!
        </p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            className={`btn ${
              isListening ? "btn-danger" : "btn-dark"
            }  btn-block btn-lg`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? "Stop Listening" : "Start Listening"}
            {isListening ? (
              <FaMicrophoneSlash className="ml-2 mb-1" />
            ) : (
              <FaMicrophone className="ml-2 mb-1" />
            )}
          </button>
          <button className="btn btn-link" onClick={addTasksManually}>Or add your tasks manually</button>
          {isListening && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="m-0 ml-3">Listening...</p>
            </div>
          )}
          <div className="mt-3 w-100">
            {textArray.length > 0 && (
              <div>
                <h5 className="">
                  <b>What's stressing me out:</b>
                </h5>
                <p>{textArray.join(" ")}</p>
              </div>
            )}
          </div>
          {textArray.length > 0 && !isListening && (
            <button
              className="btn btn-info btn-block"
              onClick={createGeminiRequest}
            >
              Create Tasks
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
