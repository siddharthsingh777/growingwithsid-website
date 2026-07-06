/**
 * Growing With Sid — Backend API
 * Plain Express + JSON-file storage (no external database required).
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_KEY = process.env.ADMIN_KEY || 'change-me-super-secret';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim());

const DATA_DIR = path.join(__dirname, 'data');
const FILES = {
  reels: path.join(DATA_DIR, 'reels.json'),
  blogs: path.join(DATA_DIR, 'blogs.json'),
  tools: path.join(DATA_DIR, 'tools.json'),
  testimonials: path.join(DATA_DIR, 'testimonials.json'),
  subscribers: path.join(DATA_DIR, 'subscribers.json'),
  messages: path.join(DATA_DIR, 'messages.json'),
};

// ---------- middleware ----------
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.includes('*') || !origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

// simple request log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// ---------- helpers ----------
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function requireAdmin(req, res, next) {
  const key = req.header('x-api-key');
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized. Missing or invalid x-api-key header.' });
  }
  next();
}

// ---------- public content routes ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/reels', (req, res) => {
  const { category } = req.query;
  let reels = readJSON(FILES.reels);
  if (category && category !== 'all') {
    reels = reels.filter(r => r.cat === category);
  }
  res.json(reels);
});

app.get('/api/blogs', (req, res) => {
  const { category, q } = req.query;
  let blogs = readJSON(FILES.blogs);
  if (category && category !== 'all') {
    blogs = blogs.filter(b => b.cat === category);
  }
  if (q) {
    const query = q.toLowerCase();
    blogs = blogs.filter(b =>
      b.title.toLowerCase().includes(query) || b.excerpt.toLowerCase().includes(query)
    );
  }
  res.json(blogs);
});

app.get('/api/tools', (req, res) => {
  res.json(readJSON(FILES.tools));
});

app.get('/api/testimonials', (req, res) => {
  res.json(readJSON(FILES.testimonials));
});

// ---------- newsletter ----------
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body || {};
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }
  const subscribers = readJSON(FILES.subscribers);
  if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.status(200).json({ message: "You're already subscribed!" });
  }
  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  writeJSON(FILES.subscribers, subscribers);
  res.status(201).json({ message: "You're in! Check your inbox for a welcome email." });
});

// ---------- contact ----------
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !isValidEmail(email) || !subject || !message) {
    return res.status(400).json({ error: 'Name, a valid email, subject and message are all required.' });
  }
  const messages = readJSON(FILES.messages);
  messages.push({ name, email, subject, message, receivedAt: new Date().toISOString() });
  writeJSON(FILES.messages, messages);
  res.status(201).json({ message: "Message sent — I'll get back to you within 48 hours." });
});

// ---------- admin (protected) ----------
app.get('/api/admin/subscribers', requireAdmin, (req, res) => {
  res.json(readJSON(FILES.subscribers));
});

app.get('/api/admin/messages', requireAdmin, (req, res) => {
  res.json(readJSON(FILES.messages));
});

app.get('/api/admin/stats', requireAdmin, (req, res) => {
  res.json({
    subscribers: readJSON(FILES.subscribers).length,
    messages: readJSON(FILES.messages).length,
    reels: readJSON(FILES.reels).length,
    blogs: readJSON(FILES.blogs).length,
    tools: readJSON(FILES.tools).length,
  });
});

// ---------- fallback ----------
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Growing With Sid API running on http://localhost:${PORT}`);
});
