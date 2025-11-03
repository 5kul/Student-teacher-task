// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware (must come before routes)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json()); // parses JSON body
app.use(express.urlencoded({ extended: true })); // parses form body

// ✅ Debug route
app.post("/debug", (req, res) => {
  console.log("BODY RECEIVED AT /debug:", req.body);
  res.json({ received: req.body });
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
