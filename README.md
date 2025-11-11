# Visual-Aura

Real-time sentiment analysis with visual particle effects.

## What it does
Analyzes speech sentiment and creates dynamic particle visualizations that respond to emotions.

## Tech Stack
- **Frontend**: React, p5.js, Vite
- **Backend**: FastAPI, Google Gemini API
- **Features**: Speech-to-text, sentiment analysis, particle animations

## Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn python-dotenv google-generativeai
echo "GEMINI_API_KEY=your_key_here" > .env
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## How to use
1. Click microphone button
2. Speak 
3. Watch particles respond to your emotions

## API
- **POST** `/process_text` - Analyzes text sentiment
  - Returns: sentiment score, emotion, keywords
