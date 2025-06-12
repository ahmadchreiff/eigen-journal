import React, { useState } from 'react';
import axios from 'axios';

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: '',
    authorName: '',
    category: 'cmps',
    content: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/articles/submit', form);
      setSubmitted(true);
    } catch (err) {
      alert('Error submitting article.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Submit Draft Article</h1>

      {submitted ? (
        <p className="text-green-600">Your article has been submitted!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
          <input name="authorName" value={form.authorName} onChange={handleChange} placeholder="Author Name" className="w-full border p-2 rounded" required />
          <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="cmps">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="phys">Physics</option>
          </select>
          <textarea name="content" rows={10} value={form.content} onChange={handleChange} placeholder="Markdown or text content" className="w-full border p-2 rounded" required />
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Submit</button>
        </form>
      )}
    </div>
  );
}
