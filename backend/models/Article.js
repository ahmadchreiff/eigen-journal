const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["cmps", "math", "phys"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
