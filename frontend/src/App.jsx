import { useState } from 'react';
import './App.css';
import Controls from './components/Controls';
import Transcript from './components/Transcript';
import KeyWords from './components/KeyWords';
import { sendText } from './services/api';
import PerilNoise from './components/PerilNoise';
import deepgramService from './services/deepgram';

export default function App() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [sentiment, setSentiment] = useState(0);
    const [emotion, setEmotion] = useState('neutral');
    const [currentTranscript, setCurrentTranscript] = useState('');
    
    const handleToggle = async () => {
        if (!isRecording) {
            setIsRecording(true);
            setTranscript(''); 
            setCurrentTranscript('');
            
            try {
                await deepgramService.startRecording((text, isFinal) => {
                    if (isFinal) {
                        setTranscript(prev => prev + ' ' + text);
                        setCurrentTranscript('');
                        
                        sendText(text).then(response => {
                            if (response) {
                                setSentiment(response.sentiment);
                                setEmotion(response.emotion);
                                setKeywords(response.keywords || []);
                            }
                        }).catch(error => {
                            console.error('Error processing text:', error);
                        });
                    } else {
                        setCurrentTranscript(text);
                    }
                });
            } catch (error) {
                console.error('Error starting recording:', error);
                alert('Could not access microphone. Please check permissions.');
                setIsRecording(false);
            }
        } else {
            setIsRecording(false);
            deepgramService.stopRecording();
            setCurrentTranscript('');
        }
    };
    
    return (
        <div className="app">
            <PerilNoise sentiment={sentiment} emotion={emotion} />
            
            <div className="ui-overlay">
                <h1 className="title">Sentiment Aura</h1>
                
                <Transcript 
                    transcript={transcript + ' ' + currentTranscript}
                />
                
                <KeyWords keywords={keywords} />
                
                <Controls 
                    isRecording={isRecording} 
                    onToggle={handleToggle}
                />
                
                <div className="debug-info">
                    <p>Sentiment: {sentiment.toFixed(2)}</p>
                    <p>Emotion: {emotion}</p>
                </div>
            </div>
        </div>
    );
}