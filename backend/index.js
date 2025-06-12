const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const articleRoutes = require("./routes/articles");

// Middleware
app.use(cors());
app.use(express.json());

// Mount articles route
app.use("/api/articles", articleRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
