// Create web server

// Importing modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// Create server
const app = express();

// Configure server
app.use(bodyParser.json());
app.use(cors());

// Create database
const comments = [];

// Create routes
app.get("/comments", (req, res) => {
  return res.json(comments);
});

app.post("/comments", (req, res) => {
  const { author, text } = req.body;

  const comment = {
    id: uuidv4(),
    author,
    text,
  };

  comments.push(comment);

  return res.status(201).json(comment);
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;

  const index = comments.findIndex((comment) => comment.id === id);

  if (index < 0) {
    return res.status(404).json({ error: "Comment not found" });
  }

  comments.splice(index, 1);

  return res.status(204).send();
});

// Start server
app.listen(3000, () => {
  console.log("Server is running");
});