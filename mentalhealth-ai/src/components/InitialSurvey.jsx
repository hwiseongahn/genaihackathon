import React from 'react';

function InitialSurvey({ isSurveyReady, setSurveyReady }) {
    if (!isSurveyReady) {
        return (
            <div>
            <p>Finish these questions to start your diagnosis</p>
            <div className='form-group'>
                <label>
                Your age
                <input type='text' className='form-control' />
                </label>
            </div>
            <div className='form-group'>
                <label>
                What are you feeling?
                <input type='text' className='form-control' />
                </label>
            </div>
            <div className='form-group'>
                <label>
                How long have you been feeling this way?
                <input type='text' className='form-control' />
                </label>
            </div>
            <button onClick={() => setSurveyReady(true)} className='btn btn-primary'>Start Survey</button>
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}

export default InitialSurvey;