import React, { useState } from "react";
import axios from "axios";

function AuthForm({ setUser }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await axios.post("https://student-teacher-task-1rd0.onrender.com/api/auth/signup", form);
        alert("Signup successful! Please login.");
        setIsSignup(false);
      } else {
        const res = await axios.post("https://student-teacher-task-1rd0.onrender.com/api/auth/login", form);
        setUser(res.data);
        localStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="auth-box">
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} required />
            <select name="role" onChange={handleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </>
        )}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      </form>
      <p onClick={() => setIsSignup(!isSignup)} className="toggle">
        {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
      </p>
    </div>
  );
}

export default AuthForm;


