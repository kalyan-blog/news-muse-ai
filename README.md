# 🧠 Personal AI News Assistant

An AI-powered web application that delivers **personalized, summarized, and intelligent news content** based on user interests and reading behavior.

---

## 🚀 Project Overview

This project is designed to solve **information overload** by providing:

* 📌 Personalized news feed
* ✂️ AI-based news summarization
* 🤖 Interactive chatbot (past + present news)
* 📊 Historical timeline view
* ⚖️ Bias detection & sentiment insights

---

## 🏗️ Project Structure

```
project-root/
│
├── frontend/        # React + Tailwind UI
│
├── backend/         # FastAPI server
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── news.py
│   │   │   ├── chatbot.py
│   │   │   ├── user.py
│   │   │   ├── timeline.py
│   │   ├── services/
│   │   │   ├── summarizer.py
│   │   │   ├── personalization.py
│   │   │   ├── news_fetcher.py
│   │   │   ├── sentiment.py
│   │   ├── models/
│   │   │   ├── user_model.py
│   │   │   ├── news_model.py
│   │   ├── utils/
│   │   │   ├── helpers.py
│   │   ├── data/
│   │   │   ├── mock_news.json
│   │   │   ├── timeline.json
│   ├── requirements.txt
```

---

## ⚙️ Tech Stack

### 🖥️ Frontend

* React (Vite)
* Tailwind CSS
* JavaScript (ES6)

### ⚙️ Backend

* FastAPI
* Uvicorn
* Python 3.10+
* Pydantic

---

## ✨ Features

### 📰 Smart News Feed

* Daily “Today in 60 seconds” summary
* Top News, Trending, and Personalized sections
* Infinite scroll + carousel UI

---

### 🤖 AI Chatbot

* Ask news from **1990s → present**
* Summarize, compare, explain news
* Upgrade-ready for AI integration

---

### 📊 Timeline View

* Explore historical events by year
* Category-based filtering

---

### ⚖️ Smart Insights

* News sentiment (Positive / Neutral / Negative)
* Confidence score (reliability)
* Bias indicator

---

### 🎯 Personalization

* Based on user interests
* Adaptive recommendations

---

## 🚀 API Endpoints (Backend)

### GET `/news`

* Fetch all news articles

### GET `/news/personalized`

* Return news based on user interests

### POST `/summarize`

* Summarize article text

### GET `/timeline`

* Get events by year

### POST `/chat`

* Chatbot interaction

### POST `/user/preferences`

* Save user interests

---

## 🔗 Frontend ↔ Backend Connection

* Frontend runs on:

  ```
  http://localhost:5173
  ```

* Backend runs on:

  ```
  http://127.0.0.1:8000
  ```

* API base URL:

  ```javascript
  const BASE_URL = "http://127.0.0.1:8000";
  ```

---

## 🌍 Real News Integration

Uses **NewsAPI** to fetch live news data.

### Setup:

1. Get API key from: https://newsapi.org
2. Add to backend:

```python
API_KEY = "your_api_key_here"
```

---

## ▶️ How to Run the Project

### 🔹 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

### 🔹 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 🔹 3. Open Application

* Frontend:
  👉 http://localhost:5173

* Backend Docs:
  👉 http://127.0.0.1:8000/docs

---

## 📊 Mock Data

Located in:

```
backend/app/data/
```

* `mock_news.json` → Sample news
* `timeline.json` → Historical data

---

## 🔧 Key Functional Modules

### 🧠 Personalization

Filters news based on user interests

### ✂️ Summarization

Extracts key points from articles

### 😊 Sentiment Analysis

Classifies news tone

### 🌐 News Fetcher

Supports both mock and real API data

---

## 🎨 UI/UX Highlights

* Modern card-based design
* Dark/Light mode
* Smooth animations
* Carousel + scroll hybrid navigation

---

## 🚀 Future Enhancements

* 🔹 AI summarization (OpenAI / Gemini)
* 🔹 Advanced chatbot (LLM-based)
* 🔹 User authentication
* 🔹 Database integration
* 🔹 Voice assistant support

---

## 🏆 Project Outcome

This project demonstrates:

* Full-stack development
* API integration
* AI-ready architecture
* Modern UI/UX design

---

## 🎯 One-Line Description

> “An AI-powered system that delivers personalized and summarized news using intelligent filtering, chatbot interaction, and timeline-based exploration.”

---

## 📌 Author

Developed as a full-stack AI-based project for learning and real-world application.

---

💡 *Smart News. Clear Insights. Powered by AI.*
