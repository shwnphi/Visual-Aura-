
from fastapi import FastAPI
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI



load_dotenv()
app = FastAPI()
client = OpenAI(api_key=os.getenv("API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Transcript(BaseModel):
    text: str


## Analyzes the transcription
@app.post("/process_text")
def transcribe(input: Transcript):
    data = {}
    keywords_list = []
    text = input.text

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Respond in this format: number,emotion, keyword 1, keyword 2, keyword 3"},
        {"role": "user", "content": f"""Analyze this {text}, 
         respond with the sentiment from -1(negative) to 1(positive), 
         the primary emotion of {text}, and 3 Keywords """}
        ],
        temperature = 0 
)   

    ai_answer = response.choices[0].message.content
    split_answer = ai_answer.split(",")

    data["sentiment"] = float(split_answer[0].strip())
    data["emotion"] = split_answer[1].strip()

    for i in range(2, len(split_answer)):
        keywords_list.append(split_answer[i].strip())

    data["keywords"] = keywords_list



    return data

    





    



