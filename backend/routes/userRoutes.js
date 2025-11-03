// routes/userRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("BODY RECEIVED AT /signup:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body received" });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error("Error in /signup:", err.message);
    res.status(500).json({ message: err.message });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log(" BODY RECEIVED AT /login:", req.body);

    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error("Error in /login:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
