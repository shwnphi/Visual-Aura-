import { useState } from 'react';
import './App.css';
import Controls from './components/Controls';
import Transcript from './components/Transcript';
import KeyWords from './components/KeyWords';
import { sendText } from './services/api';

export default function App() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [sentiment, setSentiment] = useState(0);
    const [emotion, setEmotion] = useState('');
  

function handleToggle() {
    if (!isRecording) {
        setIsRecording(true);
        
        setTimeout(() => {
            const fakeText = "I am excited about this project!";
            setTranscript(fakeText);
            
            sendText(fakeText).then(response => {
                setSentiment(response.sentiment);
                setEmotion(response.emotion);
                setKeywords(response.keywords);
            });
        }, 2000);
    }
    else {
        
        setIsRecording(false);
    }
}
  
  
    return (
        <div className="app">
        <h1>Sentiment Aura</h1>
        
        <Controls 
            isRecording={isRecording} 
            onToggle={handleToggle}  
        />
        
        <Transcript 
            transcript={transcript}
        />
        
        <KeyWords 
            keywords={keywords}
        />
        
        <div style={{color: 'white'}}>
            <p>Sentiment: {sentiment}</p>
            <p>Emotion: {emotion}</p>
        </div>
    </div>
    );
};
