import { useState } from 'react'
import './App.css'
import { testController } from './controllers/GeminiController.js';
import Survey from './components/Survey.jsx';
import TasksSurvey from './components/TasksSurvey.jsx';
import HobbiesSurvey from './components/HobbiesSurvey.jsx';

function App() {
    const [hobby, setHobby] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [categorizedHobbies, setCategorizedHobbies] = useState({
      Harmful: [],
      Reasonable: [],
      Excellent: [],
    });
  
    return (
        <>
            <HobbiesSurvey 
            hobby={hobby}
            hobbies={hobbies}
            setHobby={setHobby}
            setHobbies={setHobbies}
            categorizedHobbies = {categorizedHobbies}
            setCategorizedHobbies = {setCategorizedHobbies}
            />
        </>
    );
}

export default App;
