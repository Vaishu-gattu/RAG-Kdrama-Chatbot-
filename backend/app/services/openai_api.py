# app/services/openai_api.py

import os
from openai import OpenAI

# Load environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

def ask_openai(prompt: str, model: str = "gpt-3.5-turbo") -> str:
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful Korean drama recommendation assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"❌ Error in ask_openai: {e}")
        return "Sorry, I couldn't get a response from OpenAI."
