import { useState } from 'react'
import './App.css'
import { testController } from './controllers/GeminiController.js';
import TasksSurvey from './components/TasksSurvey.jsx';
import HobbiesSurvey from './components/HobbiesSurvey.jsx';

function App() {
    const [hobby, setHobby] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [tasksDone, setTasksDone] = useState(false);
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [level, setLevel] = useState('');
    const [tasks, setTasks] = useState([]);

    
    if (!tasksDone) {
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
                    tasksDone={tasksDone}
                    setTasksDone={setTasksDone}
                />
            </div>
                
            </>
        );
    }
    else {
        return (
            <>
                <HobbiesSurvey 
                    hobby={hobby}
                    hobbies={hobbies}
                    setHobby={setHobby}
                    setHobbies={setHobbies}
                />
            </>
            );
    }
}

export default App;
