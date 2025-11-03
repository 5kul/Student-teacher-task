// src/components/TeacherDashboard.js
import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function TeacherDashboard({ user, logout }) {
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    deadline: "",
    subject: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/assignments", assignment, {
        headers: { "Content-Type": "application/json" }
      });
      setMessage("✅ Assignment added successfully!");
      setAssignment({ title: "", description: "", deadline: "", subject: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error posting assignment:", error);
      setMessage("❌ Failed to add assignment. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📘 Welcome, {user.name || "Teacher"}</h2>
        <button className="logout-btn" onClick={logout}>Logout 🚪</button>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="form-card">
        <h3>📝 Post New Assignment</h3>
        <form onSubmit={handleSubmit} className="assignment-form">
          <input
            name="title"
            placeholder="Assignment Title"
            value={assignment.title}
            onChange={handleChange}
            required
          />
          <input
            name="subject"
            placeholder="Subject"
            value={assignment.subject}
            onChange={handleChange}
            required
          />
          <input
            name="deadline"
            type="date"
            value={assignment.deadline}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Write assignment description..."
            value={assignment.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="submit-btn">
            ➕ Post Assignment
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherDashboard;
