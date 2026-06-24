import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import "./App.css";
import axios from "axios";
import jsPDF from "jspdf";   

const fees = {
  CAR: 40,
  BIKE: 20,
  TRUCK: 80,
  BUS: 100,
  AUTO: 30,
};

function App() {
  const [slots, setSlots] = useState([]);

  // ✅ ADMIN LOGIN STATE (PERSISTENT)
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const res = await axios.get("http://localhost:8080/api/slots");
    setSlots(res.data);
  };

  // ===== PARK =====
  const park = async (slot) => {
    await axios.post(`http://localhost:8080/api/park/${slot.id}`);
    localStorage.setItem(`parkTime_${slot.id}`, Date.now());
    fetchSlots();
  };

  // ===== EXIT + PDF BILL =====
  const exit = async (slot) => {
    const exitTime = Date.now();
    const parkTime = localStorage.getItem(`parkTime_${slot.id}`);

    let hours = 1;
    if (parkTime) {
      const diffMs = exitTime - parkTime;
      hours = Math.ceil(diffMs / (1000 * 60 * 60));
    }

    const feePerHour = fees[slot.slotType];
    const totalAmount = hours * feePerHour;

    // ✅ GENERATE PDF BILL
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Smart Parking System", 20, 20);

    doc.setFontSize(12);
    doc.text(`Parking Bill`, 20, 30);
    doc.text(`Slot Number: ${slot.slotNumber}`, 20, 45);
    doc.text(`Vehicle Type: ${slot.slotType}`, 20, 55);
    doc.text(`Duration: ${hours} hour(s)`, 20, 65);
    doc.text(`Rate: ₹${feePerHour} per hour`, 20, 75);
    doc.text(`-----------------------------`, 20, 85);
    doc.text(`Total Amount: ₹${totalAmount}`, 20, 95);

    doc.text(`Thank you for using Smart Parking`, 20, 120);

    doc.save(`Parking_Bill_${slot.slotNumber}.pdf`);

    localStorage.removeItem(`parkTime_${slot.id}`);

    await axios.post(`http://localhost:8080/api/exit/${slot.id}`);
    fetchSlots();
  };

  // ===== ADMIN LOGIN HANDLER =====
  const handleAdminLogin = () => {
    localStorage.setItem("adminLoggedIn", "true");
    setAdminLoggedIn(true);
  };

  const total = slots.length;
  const available = slots.filter((s) => !s.occupied).length;
  const occupied = total - available;

  return (
    <div className="app">
      <h1>🚗 Smart Parking System</h1>

      {/* ===== STATS ===== */}
      <div className="stats">
        <div className="card">
          Total Slots
          <br />
          <span>{total}</span>
        </div>
        <div className="card green">
          Available
          <br />
          <span>{available}</span>
        </div>
        <div className="card red">
          Occupied
          <br />
          <span>{occupied}</span>
        </div>
      </div>

      {/* ===== PARKING SLOTS ===== */}
      <div className="slots">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${slot.occupied ? "busy" : ""}`}
          >
            <h3>
              {slot.slotNumber} ({slot.slotType})
            </h3>

            <p>Fee: ₹{fees[slot.slotType]}/hour</p>

            <p className={slot.occupied ? "occupied" : "available"}>
              {slot.occupied ? "Occupied" : "Available"}
            </p>

            {slot.occupied ? (
              <button className="exit" onClick={() => exit(slot)}>
                Exit
              </button>
            ) : (
              <button className="park" onClick={() => park(slot)}>
                Park
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ===== ADMIN SECTION ===== */}
      <hr style={{ margin: "50px 0" }} />

      {adminLoggedIn ? (
        <Admin />
      ) : (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
    </div>
  );
}

export default App;