// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import draftRoutes from './routes/draftRoutes.js';

dotenv.config();

const app = express();

/* ──────────────────────────────────────────────
   CORS – development settings
─────────────────────────────────────────────── */
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));        // main CORS middleware

/* ──────────────────────────────────────────────
   Middleware - logging and body parsing
─────────────────────────────────────────────── */
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

/* ──────────────────────────────────────────────
   Serve uploaded files (e.g., PDFs)
─────────────────────────────────────────────── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ──────────────────────────────────────────────
   Test route to verify server is working
─────────────────────────────────────────────── */
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

/* ──────────────────────────────────────────────
   API Routes
─────────────────────────────────────────────── */
app.use('/api/drafts', draftRoutes);

/* ──────────────────────────────────────────────
   Error handling middleware
─────────────────────────────────────────────── */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Internal server error' 
  });
});

/* ──────────────────────────────────────────────
   MongoDB connection & server startup
─────────────────────────────────────────────── */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'eigen-journal'
})
.then(() => {
  console.log('Mongo ➜', mongoose.connection.host);
  app.listen(PORT, () => {
    console.log(`▲  Backend running at http://localhost:${PORT}`);
    console.log(`✓  CORS enabled for http://localhost:3000`);
    console.log(`✓  Test endpoint: http://localhost:${PORT}/api/test`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});