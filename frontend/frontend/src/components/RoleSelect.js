import React from "react";

function RoleSelect({ setRole }) {
  return (
    <div>
      <h2>Select Your Role</h2>
      <button onClick={() => setRole("teacher")}>I am a Teacher</button>
      <button onClick={() => setRole("student")}>I am a Student</button>
    </div>
  );
}

export default RoleSelect;
