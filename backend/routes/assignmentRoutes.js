import express from "express";
import Assignment from "../models/Assignment.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Teacher posts assignment
router.post("/", (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const { title, description, deadline, subject } = req.body;

  // validate
  if (!title || !description || !deadline || !subject) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // respond success
  res.status(201).json({
    message: "Assignment received successfully!",
    assignment: { title, description, deadline, subject },
  });
});

// Students view assignments
router.get("/", protect, async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
