import { useState } from 'react'
import './App.css'
import { testController } from './controllers/GeminiController.js';
import Survey from './components/Survey.jsx';
import TasksSurvey from './components/TasksSurvey.jsx';

function App() {

    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [level, setLevel] = useState('');
    const [tasks, setTasks] = useState([]);

    return (
        <>
        <div className='col-md-12'>
            <TasksSurvey 
                task={task}
                setTask={setTask}
                level={level}
                setLevel={setLevel}
                dueDate={dueDate}
                setDueDate={setDueDate}
                tasks={tasks}
                setTasks={setTasks}
            />
        </div>
            
        </>
    );
}

export default App;
