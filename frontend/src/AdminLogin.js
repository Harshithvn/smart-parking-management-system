import React, { useState } from "react";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      onLogin();
    } else {
      setError("❌ Invalid credentials");
    }
  };

  return (
    <div style={loginBox}>
      <h3>🔐 Admin Login</h3>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={input}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogin} style={btn}>
        Login
      </button>
    </div>
  );
}

const loginBox = {
  background: "#020617",
  padding: "25px",
  borderRadius: "12px",
  width: "300px",
  margin: "40px auto",
  color: "white",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "none"
};

const btn = {
  background: "#22c55e",
  padding: "10px",
  width: "100%",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default AdminLogin;