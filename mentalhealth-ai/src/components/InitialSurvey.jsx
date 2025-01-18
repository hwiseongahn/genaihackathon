import React, { useState } from 'react';


const StressTracker = () => {
  const [task, setTask] = useState('');
  const [level, setLevel] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && level) {
      const newTask = {
        id: Date.now(),
        task: task,
        level: parseInt(level)
      };
      setTasks([...tasks, newTask]);
      setTask('');
      setLevel('');
    }
  };

  return (
    <div className="container mt-5 vw-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Stress Tracker</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                <div className="mb-3">
                  <label htmlFor="stress-level" className="form-label">Stress Level</label>
                  <select
                    className="form-select"
                    id="stress-level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                  >
                    <option value="">Select stress level</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} - {num === 1 ? 'Low' : num === 5 ? 'High' : 'Medium'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor='due-date' className='form-label'>Stress Level</label>
                    <select
                        className='form-select'
                        id='due-date'
                        value={level}f
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    >
                        <option value=''>Enter due date</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num.toString()}>
                            {num} - {num === 1 ? 'Low' : num === 5 ? 'High' : 'Medium'}
                        </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>

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

export default StressTracker;