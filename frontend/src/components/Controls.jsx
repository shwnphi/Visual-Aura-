
export default function Control({ isRecording, onToggle }) {
    if (isRecording) {
        return <button onClick={onToggle}> Stop Recording</button>;
    } 
    else {
        return <button onClick={onToggle}> Start Recording </button>;
    }
};
