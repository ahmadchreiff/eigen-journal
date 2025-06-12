const express = require('express');
const router = express.Router();
const DraftArticle = require('../models/DraftArticle');

// POST /api/articles/submit
router.post('/submit', async (req, res) => {
  try {
    const { title, author, content } = req.body;

    const newArticle = new DraftArticle({ title, author, content });
    await newArticle.save();

    res.status(201).json({ message: 'Draft submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting draft.' });
  }
});

module.exports = router;
