import { useState } from 'react'
import './App.css'
import { testController } from './controllers/GeminiController.js';
import Survey from './components/Survey.jsx';
import TasksSurvey from './components/TasksSurvey.jsx';
import HobbiesSurvey from './components/HobbiesSurvey.jsx';

function App() {
    const [hobby, setHobby] = useState('');
    const [hobbies, setHobbies] = useState([]);
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

export default App;
