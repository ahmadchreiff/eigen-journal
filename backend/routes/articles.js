const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// GET all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new article
router.post("/", async (req, res) => {
  const { title, author, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const article = new Article({ title, author, content, category });
    const saved = await article.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
