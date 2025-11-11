class SpeechService {
    constructor() {
        this.recognition = null;
        this.isListening = false;
    }
    
    async startRecording(onTranscript) {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            throw new Error('Speech recognition not supported in this browser');
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        
        this.recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const transcript = event.results[last][0].transcript;
            const isFinal = event.results[last].isFinal;
            
            console.log('Speech detected:', transcript, 'Final:', isFinal);
            onTranscript(transcript, isFinal);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                alert('Microphone access denied. Please allow microphone access and try again.');
            }
        };
        
        this.recognition.onend = () => {
            console.log('Speech recognition ended');
            if (this.isListening) {
                // Restart if still supposed to be listening
                this.recognition.start();
            }
        };
        
        console.log('Starting speech recognition...');
        this.isListening = true;
        this.recognition.start();
    }
    
    stopRecording() {
        console.log('Stopping speech recognition...');
        this.isListening = false;
        if (this.recognition) {
            this.recognition.stop();
            this.recognition = null;
        }
    }
}

export default new SpeechService();