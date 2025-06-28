const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json()); // for parsing JSON

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://alvinopshatto:Alvino%40141005@cluster0.9rakdho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Define a simple TODO schema
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);

// Create TODO
app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create({ text: req.body.text });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all TODOs
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
