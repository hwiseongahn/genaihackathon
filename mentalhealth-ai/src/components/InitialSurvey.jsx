import React, { useState } from 'react';

function InitialSurvey({ isSurveyReady, setSurveyReady, tasks, setTasks, hobbies, setHobbies }) {


    const handleTasksChange = (e) => {
        setTasks(e.target.value);
    };

    const handleHobbiesChange = (e) => {
        setHobbies(e.target.value);
    };

    const handleSubmit = () => {
        // You can process the input values here
        console.log('Tasks:', tasks);
        console.log('Hobbies:', hobbies);
        setSurveyReady(true);
    };

    if (!isSurveyReady) {
        return (
            <div>
            <p>Finish these questions to start your planning!</p>
            <div className='form-group'>
                <label>
                What are tasks that are stressing you out?
                <input type='text' className='form-control' value={tasks} onChange={handleTasksChange} />
                </label>
                <label>
                Stress Level
                <select className='form-control' value={tasks} onChange={handleTasksChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </label>
            </div>
            {/* <div className='form-group'>
                <label>
                What are hobbies that destress you?
                <input type='text' className='form-control' value={hobbies} onChange={handleHobbiesChange} />
                </label>
            </div> */}
            <button onClick={handleSubmit} className='btn btn-primary'>Start Planning</button>
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}

export default InitialSurvey;