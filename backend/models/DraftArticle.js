import mongoose from 'mongoose';

const DraftArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorName: { type: String, required: true },
  category: { type: String, enum: ['cmps', 'math', 'phys'], required: true },
  content: { type: String, required: true }, // supports Markdown or plain text
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('DraftArticle', DraftArticleSchema);
