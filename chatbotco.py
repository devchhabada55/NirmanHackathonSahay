from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json

app = Flask(__name__)
CORS(app)

# Configure Gemini API
genai.configure(api_key='AIzaSyBDQfBKivNhofiw4_rqgQ46wMaf99XB6fM')
model = genai.GenerativeModel('gemini-1.0-pro')

def create_prompt(query):
    context = """You are Sahay Assistant, a helpful chatbot for VIIT (Vishwakarma Institute of Information Technology, Pune) students.
    You help students with information about:
    - Campus facilities and locations
    - Academic programs and courses
    - Events and activities
    - College clubs and communities
    - Research opportunities
    - Job and internship opportunities
    - Alumni network
    - Student accommodation
    - And other campus-related queries
    
    Please provide accurate, helpful responses based on the available information. and just answer to what is asked"""
    
    return f"{context}\n\nUser Query: {query}"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    query = data.get('message', '')
    
    try:
        prompt = create_prompt(query)
        response = model.generate_content(prompt)
        return jsonify({
            'response': response.text,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'response': 'Sorry, I encountered an error. Please try again.',
            'status': 'error',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True,port=5001)