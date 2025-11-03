// src/App.js
import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Load user if saved
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ✅ Logout clears state and storage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="main-container">
      <header className="app-header">
        <h1>🎓 Student-Teacher Connect</h1>
      </header>

      {/* ✅ Conditional rendering */}
      {!user ? (
        <AuthForm setUser={setUser} />
      ) : user.role === "teacher" ? (
        <TeacherDashboard user={user} logout={logout} />
      ) : (
        <StudentDashboard user={user} logout={logout} />
      )}
    </div>
  );
}

export default App;
