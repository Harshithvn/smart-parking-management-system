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

  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  // ===== VEHICLE POPUP =====
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");

  // ===== JWT TOKEN =====
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchSlots();
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
        alert("Please login again.");
      }
    }
  };

  // ===== OPEN POPUP =====
  const park = (slot) => {
    setSelectedSlot(slot);
    setVehicleNumber("");
    setOwnerName("");
    setShowPopup(true);
  };

  // ===== CONFIRM PARK =====
  const confirmPark = async () => {

    if (!vehicleNumber.trim()) {
      alert("Please enter Vehicle Number");
      return;
    }

    if (!ownerName.trim()) {
      alert("Please enter Owner Name");
      return;
    }

    try {

      await axios.post(

        `http://localhost:8080/api/park/${selectedSlot.id}`,

        {
          vehicleNumber,
          ownerName,
          vehicleType: selectedSlot.slotType,
          slotNumber: selectedSlot.slotNumber,
        },

        config

      );

      localStorage.setItem(
        `parkTime_${selectedSlot.id}`,
        Date.now()
      );

      setShowPopup(false);

      fetchSlots();

    } catch (err) {
      console.error(err);
      alert("Parking Failed");
    }

  };

  // ===== EXIT + PROFESSIONAL PDF =====
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

  const currentDate = new Date();

  const doc = new jsPDF();

  // ===== TITLE =====
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("SMART PARKING SYSTEM", 40, 20);

  doc.setFontSize(13);
  doc.text("Parking Receipt", 72, 30);

  doc.line(20, 35, 190, 35);

  // ===== RECEIPT DETAILS =====
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Receipt No : ${Math.floor(Math.random() * 100000)}`,
    20,
    50
  );

  doc.text(
    `Date : ${currentDate.toLocaleString()}`,
    20,
    60
  );

  doc.line(20, 66, 190, 66);

  // ===== VEHICLE DETAILS =====
  doc.setFont("helvetica", "bold");
  doc.text("Vehicle Details", 20, 78);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Vehicle Number : ${vehicleNumber || "N/A"}`,
    20,
    90
  );

  doc.text(
    `Owner Name : ${ownerName || "N/A"}`,
    20,
    100
  );

  doc.text(
    `Vehicle Type : ${slot.slotType}`,
    20,
    110
  );

  doc.text(
    `Slot Number : ${slot.slotNumber}`,
    20,
    120
  );

  doc.line(20, 126, 190, 126);

  // ===== BILL DETAILS =====
  doc.setFont("helvetica", "bold");
  doc.text("Billing Details", 20, 138);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Parking Duration : ${hours} Hour(s)`,
    20,
    150
  );

  doc.text(
    `Rate : ₹${feePerHour} / Hour`,
    20,
    160
  );

  doc.text(
    `Total Amount : ₹${totalAmount}`,
    20,
    170
  );

  doc.line(20, 178, 190, 178);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(
    "Thank You For Using Smart Parking System",
    25,
    195
  );

  doc.save(
    `Parking_Bill_${slot.slotNumber}.pdf`
  );

  localStorage.removeItem(`parkTime_${slot.id}`);

  try {

    await axios.post(
      `http://localhost:8080/api/exit/${slot.id}`,
      {},
      config
    );

    fetchSlots();

  } catch (err) {

    console.error(err);

  }

};
    // ===== ADMIN LOGIN =====
  const handleAdminLogin = () => {
    localStorage.setItem("adminLoggedIn", "true");
    setAdminLoggedIn(true);
  };

  const total = slots.length;
  const available = slots.filter((s) => !s.occupied).length;
  const occupied = total - available;

  return (
    <div className="app">

      {/* ===== VEHICLE DETAILS POPUP ===== */}

      {showPopup && selectedSlot && (
        <div className="popup-overlay">

          <div className="popup">

            <h2>🚗 Park Vehicle</h2>

            <div className="popup-group">
              <label>Vehicle Number</label>

              <input
                type="text"
                placeholder="KA01AB1234"
                value={vehicleNumber}
                onChange={(e) =>
                  setVehicleNumber(e.target.value.toUpperCase())
                }
              />
            </div>

            <div className="popup-group">
              <label>Owner Name</label>

              <input
                type="text"
                placeholder="Enter Owner Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>

            <div className="popup-group">
              <label>Vehicle Type</label>

              <input
                value={selectedSlot.slotType}
                readOnly
              />
            </div>

            <div className="popup-group">
              <label>Slot Number</label>

              <input
                value={selectedSlot.slotNumber}
                readOnly
              />
            </div>

            <div className="popup-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={confirmPark}
              >
                Park Vehicle
              </button>

            </div>

          </div>

        </div>
      )}

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

            <p>
              Fee: ₹{fees[slot.slotType]}/hour
            </p>

            <p
              className={
                slot.occupied
                  ? "occupied"
                  : "available"
              }
            >
              {slot.occupied
                ? "Occupied"
                : "Available"}
            </p>

            {slot.occupied ? (

              <button
                className="exit"
                onClick={() => exit(slot)}
              >
                Exit
              </button>

            ) : (

              <button
                className="park"
                onClick={() => park(slot)}
              >
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
        <AdminLogin
          onLogin={handleAdminLogin}
        />
      )}

    </div>
  );
}

export default App;