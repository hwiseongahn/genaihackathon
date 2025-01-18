import React from 'react';

function Survey({ isSurveyReady, tasks, hobbies}) {
    if (isSurveyReady) {
        return (
            <div className='container'>
                This is what your day should look like:
                {tasks}
                {hobbies}
            <form>
                <div className='flex-column'>
                </div>
            </form>
            </div>
        );
    } 
    else {
        return (
            <></>
        );
    }
}

export default Survey;