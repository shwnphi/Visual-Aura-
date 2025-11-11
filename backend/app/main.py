from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()
app = FastAPI()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Transcript(BaseModel):
    text: str



@app.post("/process_text")
def transcribe(input: Transcript):
    try:
        text = input.text
        print(f"Received text: {text}")
        
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"""Analyze this text: "{text}"
                    Respond ONLY in this format: number,emotion,keyword1,keyword2,keyword3
                    Where:
                    - number is sentiment from -1 to 1
                    - emotion is one of: happy, sad, angry, neutral
                    - keywords are 3 main words
                    Example: 0.8,happy,sunshine,joy,wonderful"""
                }]
            }]
        }
        
        response = requests.post(url, json=payload)
        response_data = response.json()
        
        if 'candidates' in response_data:
            ai_answer = response_data['candidates'][0]['content']['parts'][0]['text'].strip()
            print(f"Gemini response: {ai_answer}")
            
            split_answer = ai_answer.split(",")
            
            sentiment = float(split_answer[0].strip())
            emotion = split_answer[1].strip() if len(split_answer) > 1 else "neutral"
            keywords = [split_answer[i].strip() for i in range(2, min(5, len(split_answer)))]
            
            result = {
                "sentiment": sentiment,
                "emotion": emotion,
                "keywords": keywords
            }
            
            print(f"SENDING TO FRONTEND: {result}")
            return result
        else:
            print(f"API Error: {response_data}")
            return {"sentiment": 0, "emotion": "neutral", "keywords": ["error"]}
            
    except Exception as e:
        print(f"Error: {e}")
        return {"sentiment": 0, "emotion": "neutral", "keywords": ["speaking"]}