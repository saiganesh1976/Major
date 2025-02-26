import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./SlotBookings.css"

const SlotBookings = ({ url }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${url}/api/bookings/getBookings`);
      if (response.data.success) {
        setBookings(response.data.data);
      } else {
        toast.error("Error fetching bookings");
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="Admin-list add flex-col">
      <h2>User Slot Bookings</h2>
      <table className="slot-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Slot</th>
            <th>Ration Card Number</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.slot}</td>
              <td>{booking.rationCardNumber}</td>
              <td>{booking.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlotBookings;
