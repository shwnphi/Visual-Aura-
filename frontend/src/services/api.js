import axios from 'axios';

const BACKEND_URL = "http://localhost:8000";

export async  function sendText(text) { 
    const RESPONSE = await axios.post(`${BACKEND_URL}/process_text`, { text: text });

    return RESPONSE.data;
}