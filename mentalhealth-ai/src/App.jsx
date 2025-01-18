import { useState } from 'react'
import './App.css'
import TasksSurvey from './components/TasksSurvey.jsx';
import HobbiesSurvey from './components/HobbiesSurvey.jsx';
import DayPlanner from './components/DayPlanner.jsx';

function App() {
    const [hobby, setHobby] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [categorizedHobbies, setCategorizedHobbies] = useState({
        Harmful: [],
        Reasonable: [],
        Excellent: [],
      });
    const [filteredHobbies, setFilteredHobbies] = useState([]);
    const [showTasks, setShowTasks] = useState(true);
    const [showHobbies, setShowHobbies] = useState(false);
    const [showDayPlanner, setShowDayPlanner] = useState(false);
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [stress, setStress] = useState('');
    const [priority, setPriority] = useState('');
    const [tasks, setTasks] = useState([]);

    return (
      <>
      { showTasks && 
            <div className='col-md-12'>
                <TasksSurvey 
                    task={task}
                    setTask={setTask}
                    stress={stress}
                    setStress={setStress}
                    priority={priority}
                    setPriority={setPriority}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    tasks={tasks}
                    setTasks={setTasks}
                    setShowTasks={setShowTasks}
                    setShowHobbies = {setShowHobbies}
                />
            </div>
      }
      {
        showHobbies && 
        <HobbiesSurvey 
            hobby={hobby}
            hobbies={hobbies}
            setHobby={setHobby}
            setHobbies={setHobbies}
            categorizedHobbies = {categorizedHobbies}
            setCategorizedHobbies = {setCategorizedHobbies}
            setShowHobbies={setShowHobbies}
            setShowDayPlanner={setShowDayPlanner}
            setFilteredHobbies={setFilteredHobbies}
            />
      }
      {
        showDayPlanner && 
        <DayPlanner
        tasks={tasks}
        filteredHobbies={filteredHobbies}
        showDayPlanner={showDayPlanner}
        />
      }
      </>
    )
}

export default App;
