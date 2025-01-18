import { useState } from 'react'
import './App.css'
import { testController } from './controllers/GeminiController.js';
import Survey from './components/Survey.jsx';
import InitialSurvey from './components/InitialSurvey.jsx';

function App() {
    const [isSurveyReady, setSurveyReady] = useState(false);

    return (
        <>
            <InitialSurvey isSurveyReady={isSurveyReady} setSurveyReady={setSurveyReady} />
            <Survey isSurveyReady={isSurveyReady} />
        </>
    );
}

export default App;
