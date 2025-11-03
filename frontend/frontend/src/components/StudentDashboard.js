import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get("https://student-teacher-task-1.onrender.com/api/assignments")
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>📚 Available Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {assignments.map((a) => (
            <li key={a._id} style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
              <h3>{a.title}</h3>
              <p><b>Subject:</b> {a.subject}</p>
              <p><b>Deadline:</b> {a.deadline}</p>
              <p>{a.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentDashboard;


