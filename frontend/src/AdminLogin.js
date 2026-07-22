import React, { useState } from "react";
import axios from "axios";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      // Store JWT and user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("adminLoggedIn", "true");

      onLogin();
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError("Invalid email or password");
      } else {
        setError("Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginBox}>
      <h3>🔐 Admin Login</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      {error && <p style={{ color: "#ff4d4d" }}>{error}</p>}

      <button onClick={handleLogin} style={btn} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
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
  border: "none",
  boxSizing: "border-box"
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