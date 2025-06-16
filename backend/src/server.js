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

// ──────────────── Resolve path issues for static folder ────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────── CORS Setup ────────────────
const corsOptions = {
  origin: 'http://localhost:3000', // adjust to your frontend origin
  credentials: true
};
app.use(cors(corsOptions));                         // attach CORS headers
app.options('/api/drafts', cors(corsOptions));      // allow pre-flight for POST

// ──────────────── Middleware ────────────────
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ──────────────── Static Folder for PDF uploads ────────────────
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ──────────────── API Routes ────────────────
app.use('/api/drafts', draftRoutes); // safe! no wildcards

// ──────────────── MongoDB Connect and Start ────────────────
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});
