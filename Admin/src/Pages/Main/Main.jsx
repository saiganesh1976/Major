import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Main.css";

const Main = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [farmerRequests, setFarmerRequests] = useState([]);
  const [emergencyRequests, setEmergencyRequests] = useState([]);

  const fetchRequisitionData = async () => {
    try {
      const response = await axios.get(
        "https://major-backend-5gti.onrender.com/api/requisition/getRequisition"
      );
      if (response.data.success) {
        setRequisitions(response.data.data);
      } else {
        toast.error("Error fetching requisitions");
      }
    } catch (error) {
      toast.error("Failed to fetch requisition data");
      console.error("Fetch error:", error);
    }
  };

  const fetchFarmersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/farmers/getFarmersData"
      );
      if (response.data.success) {
        setFarmerRequests(response.data.data);
      } else {
        toast.error("Error fetching farmer requests");
      }
    } catch (error) {
      toast.error("Failed to fetch farmer data");
      console.error("Fetch error:", error);
    }
  };

  const fetchEmergencyData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/emergencyRation/getEmergencyRation"
      );
      if (response.data.success) {
        setEmergencyRequests(response.data.data);
      } else {
        toast.error("Error fetching emergency requests");
      }
    } catch (error) {
      toast.error("Failed to fetch emergency data");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchRequisitionData();
    fetchFarmersData();
    fetchEmergencyData();
  }, []);

  return (
    <div className="Admin-Main">
      <div className="Admin-Main-section">
        <h2>Requisition Requests</h2>
        <div className="card-container">
          {requisitions.map((req) => (
            <div className="card" key={req._id}>
              <h3>Requisition #{req.requisitionNumber}</h3>
              <p>
                <strong>State:</strong> {req.state}
              </p>
              <p>
                <strong>From:</strong>{" "}
                {new Date(req.timePeriodFrom).toLocaleDateString()}
              </p>
              <p>
                <strong>To:</strong>{" "}
                {new Date(req.timePeriodTo).toLocaleDateString()}
              </p>
              <p>
                <strong>Quantity:</strong> {req.quantity} Mts.
              </p>
              <p>
                <strong>Ration Type:</strong> {req.rationType}
              </p>
              <p>
                <strong>Remarks:</strong> {req.remarks}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="Admin-Main-section">
        <h2>Farmer Requests</h2>
        <div className="card-container">
          {farmerRequests.map((farmer) => (
            <div className="card" key={farmer._id}>
              <h3>Farmer: {farmer.name}</h3>
              <p>
                <strong>Aadhar No:</strong> {farmer.aadharNo}
              </p>
              <p>
                <strong>Crop:</strong> {farmer.crop}
              </p>
              <p>
                <strong>Quantity:</strong> {farmer.quantity} kg
              </p>
              <p>
                <strong>Price:</strong> ₹. {farmer.price}
              </p>
              <p>
                <strong>Remarks:</strong> {farmer.remark}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="Admin-Main-section">
        <h2>Emergency Ration Requests</h2>
        <div className="card-container">
          {emergencyRequests.map((request) => (
            <div className="card" key={request._id}>
              <h3>Emergency Request by {request.name}</h3>
              <p>
                <strong>Ration No:</strong> {request.rationNo}
              </p>
              <p>
                <strong>Aadhar No:</strong> {request.aadhaarNo}
              </p>
              <p>
                <strong>Address:</strong> {request.address}
              </p>
              <p>
                <strong>Message:</strong> {request.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
