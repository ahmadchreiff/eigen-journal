import { Schema, model } from 'mongoose';

const draftSchema = new Schema(
  {
    // Author
    firstName:   { type: String, required: true },
    lastName:    { type: String, required: true },
    email:       { type: String, required: true },
    studentId:   { type: String, required: true },
    affiliation: { type: String, default: 'American University of Beirut' },
    year:        String,
    major:       String,

    // Article
    title:    { type: String, required: true },
    abstract: { type: String, required: true },
    category: { type: String, enum: ['cmps', 'math', 'phys'], required: true },
    keywords: [String],

    // File
    pdfPath:  String,
    fileName: String,
    fileSize: Number,

    // Metadata
    isOriginalWork:   Boolean,
    hasEthicsApproval:Boolean,
    agreedToTerms:    Boolean,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

export default model('Draft', draftSchema);
