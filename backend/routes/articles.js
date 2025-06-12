import express from 'express';
import DraftArticle from '../models/DraftArticle.js';

const router = express.Router();

// POST /api/articles/submit
router.post('/submit', async (req, res) => {
  try {
    const draft = new DraftArticle(req.body);
    await draft.save();
    res.status(201).json({ message: 'Draft submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Submission failed.' });
  }
});

export default router;