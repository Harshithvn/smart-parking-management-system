import React, { useEffect, useState } from "react";
import axios from "axios";

/* ===== CHART IMPORTS ===== */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Admin() {
  const [slots, setSlots] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [revenueHistory, setRevenueHistory] = useState([]);

  // ===== JWT TOKEN =====
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchSlots();
    fetchRevenue();
  }, []);

  // ===== FETCH SLOTS =====
  const fetchSlots = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/slots",
        config
      );

      setSlots(res.data);
    } catch (err) {
      console.error("Failed to fetch slots:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        logout();
      }
    }
  };

  // ===== FETCH TOTAL REVENUE =====
  const fetchRevenue = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/revenue",
        config
      );

      setRevenue(res.data);

      setRevenueHistory((prev) =>
        prev.length === 0 || prev[prev.length - 1] !== res.data
          ? [...prev, res.data]
          : prev
      );
    } catch (err) {
      console.error("Failed to fetch revenue:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        logout();
      }
    }
  };

  // ===== RESET SLOTS =====
  const resetAllSlots = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/admin/reset",
        {},
        config
      );

      alert("All parking slots reset successfully");

      fetchSlots();
      fetchRevenue();
    } catch (err) {
      console.error("Reset failed:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired. Please login again.");
        logout();
      }
    }
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("adminLoggedIn");

    window.location.reload();
  };

  const occupied = slots.filter((s) => s.occupied).length;

  /* ===== CHART DATA ===== */
  const chartData = {
    labels: revenueHistory.map((_, i) => `Step ${i + 1}`),
    datasets: [
      {
        label: "Total Revenue (₹)",
        data: revenueHistory,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.25)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div style={container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>🛠 Admin Panel</h2>
        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* ===== SUMMARY ===== */}
      <div style={summaryBox}>
        <div style={card}>
          💰 Revenue
          <br />
          <b>₹{revenue}</b>
        </div>

        <div style={card}>
          🚗 Total Slots
          <br />
          <b>{slots.length}</b>
        </div>

        <div style={card}>
          ❌ Occupied
          <br />
          <b>{occupied}</b>
        </div>
      </div>

      {/* ===== REVENUE CHART ===== */}
      <h3 style={{ marginTop: "30px" }}>📈 Revenue Growth</h3>

      <div style={chartBox}>
        <Line data={chartData} />
      </div>

      <button onClick={resetAllSlots} style={resetBtn}>
        Reset All Parking Slots
      </button>

      {/* ===== SLOT TABLE ===== */}
      <h3 style={{ marginTop: "30px" }}>📋 Slot Details</h3>

      <table style={table}>
        <thead>
          <tr style={{ background: "#1e293b" }}>
            <th style={th}>ID</th>
            <th style={th}>Slot</th>
            <th style={th}>Type</th>
            <th style={th}>Status</th>
            <th style={th}>Last Fee</th>
          </tr>
        </thead>

        <tbody>
                  {slots.map((slot) => (
            <tr key={slot.id}>
              <td style={td}>{slot.id}</td>
              <td style={td}>{slot.slotNumber}</td>
              <td style={td}>{slot.slotType}</td>
              <td style={td}>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    background: slot.occupied ? "#7f1d1d" : "#064e3b",
                    color: "white",
                  }}
                >
                  {slot.occupied ? "OCCUPIED" : "AVAILABLE"}
                </span>
              </td>
              <td style={td}>₹{slot.fee || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  marginTop: "50px",
  padding: "30px",
  background: "rgba(0,0,0,0.35)",
  borderRadius: "12px",
  color: "white",
};

const summaryBox = {
  display: "flex",
  gap: "20px",
  margin: "20px 0",
};

const card = {
  background: "#020617",
  padding: "15px 25px",
  borderRadius: "10px",
  textAlign: "center",
};

const chartBox = {
  background: "#020617",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
};

const resetBtn = {
  background: "#ff4d4d",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px",
};

const logoutBtn = {
  background: "#334155",
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  height: "40px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
};

const th = {
  padding: "10px",
  borderBottom: "1px solid #555",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #444",
  textAlign: "center",
};

export default Admin;