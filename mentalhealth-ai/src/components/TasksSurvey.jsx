import React, { useState } from 'react';


function TasksSurvey ({task, setTask, level, setLevel, dueDate, setDueDate, tasks, setTasks, tasksDone, setTasksDone}) {
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && level && dueDate) {
      const newTask = {
        id: Date.now(),
        task: task,
        level: parseInt(level),
        dueDate: dueDate
      };
      setTasks([...tasks, newTask]);
      setTask('');
      setLevel('');
      setDueDate('');
    }
  };

return (
    <div className="container mt-5 vw-100">
        <div className="row justify-content-center w-100">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h2 className="mb-0">Stress Tracker</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <div className='col-md-5'>
                                    <label htmlFor="task" className="form-label">What's stressing you?</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="task"
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                        placeholder="Enter your stressful task"
                                        required
                                    />
                                </div>
                                <div className='col-md-3 d-flex flex-column p-0'>
                                    <label htmlFor="stress-level" className="form-label">Stress Level</label>
                                    <select
                                        className="form-select bg-white text-secondary flex-grow-1 rounded"
                                        id="stress-level"
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
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
                                <div className='col-md-4'>
                                    <label htmlFor='due-date' className='form-label'>Enter due date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="due-date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        placeholder="Enter your due date"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Add task</button>
                        </form>
                        <button onClick={() => setTasksDone(true)} className="btn btn-primary w-100">Submit</button>

                        {tasks.length > 0 && (
                            <div className="mt-4">
                                <h3>Logged Tasks:</h3>
                                <ul className="list-group">
                                    {tasks.map((t) => (
                                        <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {t.task}
                                            <span className={`badge bg-${t.level <= 2 ? 'success' : t.level <= 4 ? 'warning' : 'danger'} rounded-pill`}>
                                                Level {t.level}
                                            </span>
                                            <span className="">
                                                Due Date: {t.dueDate}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default TasksSurvey;