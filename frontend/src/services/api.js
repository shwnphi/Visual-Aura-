import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const sendText = async (text) => {
    try {
        console.log('Sending text to backend:', text);
        
        const response = await axios.post(`${API_URL}/process_text`, { 
            text: text 
        });
        
        console.log('Raw axios response:', response);
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
        console.log('Response data type:', typeof response.data);
        
        // IMPORTANT: Return response.data, not the whole response
        return response.data;
        
    } catch (error) {
        console.error('API Error:', error);
        console.error('Error response:', error.response);
        
        // Return default values on error so the app doesn't crash
        return {
            sentiment: 0,
            emotion: 'neutral',
            keywords: []
        };
    }
};