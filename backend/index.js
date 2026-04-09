const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { mockNews, todaySummary, timelineEvents, chatResponses } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// GET all news with optional category and isBreaking filters
app.get('/api/news', (req, res) => {
  const { category, isBreaking } = req.query;
  let filteredNews = [...mockNews];
  
  if (category && category !== 'All') {
    filteredNews = filteredNews.filter(n => n.category.toLowerCase() === category.toLowerCase());
  }
  if (isBreaking === 'true') {
    filteredNews = filteredNews.filter(n => n.isBreaking);
  }
  
  res.json(filteredNews);
});

// GET a specific news article by ID
app.get('/api/news/:id', (req, res) => {
  const article = mockNews.find(n => n.id === req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// GET today's summary
app.get('/api/summary', (req, res) => {
  res.json(todaySummary);
});

// GET timeline events
app.get('/api/timeline', (req, res) => {
  res.json(timelineEvents);
});

// POST chat message and receive AI-like response
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  const response = chatResponses[message.toLowerCase()] || chatResponses['default'];
  
  // adding a fake delay to simulate AI processing if requested
  setTimeout(() => {
    res.json({ response });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
