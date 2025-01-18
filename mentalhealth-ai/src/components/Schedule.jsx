import React from 'react'

const Schedule = ({tasks}) => {
const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

return (
    <div className="card">
        <div className="card-body">
            <div className="d-flex flex-column align-items-start">
                <h4><b>Day Schedule</b></h4>
                <p className="text-muted">Plan your day hour by hour</p>
            </div>
            <div className="">
                <ul className="list-group list-group-flush">
                    {
                        tasks.map((task, index) => (
                            <li className="list-group-item p-1" key={index}>
                                <div className="d-flex justify-content-between">
                                    <p className='m-0'><b>{task.startTime} - {task.endTime}</b></p>
                                    <p className='m-0'>{task.activityName}</p>
                                </div>
                            </li>
                        ))
                        
                    }
                </ul>
            </div>
        </div>
    </div>
)
}

export default Schedule