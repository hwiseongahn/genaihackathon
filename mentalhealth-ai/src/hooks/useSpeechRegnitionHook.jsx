import { useEffect, useState} from "react";

let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
    const [text, setText] = useState();
    const [textArray, setTextArray] = useState([]);
    const [isListening, setIsListening] =useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            console.log(event);
            const transcriptArray = [];
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcriptArray.push(event.results[i][0].transcript);
            }
            setTextArray(prevText => [...prevText, ...transcriptArray]);
            setIsListening(true);
        }
    }, []);

    const startListening = () => {
        setTextArray([]);
        setIsListening(true);
        recognition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    }

    return {
        textArray,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    }

}

export default useSpeechRecognition;
