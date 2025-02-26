import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddSlots.css";

const AddSlots = ({ url }) => {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [slots, setSlots] = useState([]);

  // Fetch slots
  useEffect(() => {
    axios
      .get(`${url}/api/slots/getSlots`)
      .then((response) => setSlots(response.data))
      .catch((error) => console.error("Error fetching slots:", error));
  }, [slots]);

  // Add slot function
  const handleAddSlot = async () => {
    if (!date || !slot) {
      toast.error("Please select a date and slot");
      return;
    }

    try {
      await axios.post(`${url}/api/slots/addSlot`, { date, slot });
      toast.success("Slot added successfully!");
      setDate("");
      setSlot("");
    } catch (error) {
      console.error("Error adding slot:", error);
      toast.error("Failed to add slot");
    }
  };

  return (
    <div className="Admin-add">
      <h2>Add Slots</h2>
      <div className="add-slots-container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          placeholder="Enter time slot (e.g., 9:00 AM - 10:00 AM)"
          className="time-input"
          required
        />
        <button onClick={handleAddSlot} className="add-slot-btn">
          Add Slot
        </button>
      </div>

      <div className="Admin-slots-avilable">
        <h3>Available Slots</h3>
        <ul className="slots-list">
          {slots.map((s, index) => (
            <li className="slot" key={index}>
              {new Date(s.date).toLocaleDateString()} - {s.slot}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddSlots;
