import { useState } from 'react'
import './App.css'
import { testController } from './controllers/GeminiController.js';
import Survey from './components/Survey.jsx';
import InitialSurvey from './components/InitialSurvey.jsx';

function App() {
    const [isSurveyReady, setSurveyReady] = useState(false);
    const [tasks, setTasks] = useState('');
    const [hobbies, setHobbies] = useState('');

    return (
        <>
            <InitialSurvey 
                isSurveyReady={isSurveyReady} 
                setSurveyReady={setSurveyReady} 
                tasks={tasks}
                setTasks={setTasks}
                hobbies={hobbies}
                setHobbies={setHobbies}
            />
            <Survey 
                isSurveyReady={isSurveyReady}
                tasks={tasks}
                setTasks={setTasks}
                hobbies={hobbies}
                setHobbies={setHobbies}
            />
        </>
    );
}

export default App;
