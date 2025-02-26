import React from "react";
import "./AddDealers.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddDealers = ({ url }) => {
  const [formData, setFormData] = useState({
    officeState: "Telangana",
    officeDistrict: "",
    officeName: "",
    shopNumber: "",
    mobileNumber: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/api/dealers/addDealers`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(formData);

      if (response.data.success) {
        setFormData({
          officeState: "Telangana",
          officeDistrict: "",
          officeName: "",
          shopNumber: "",
          mobileNumber: "",
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="Admin-add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Office State</p>
            <input
              type="text"
              name="officeState"
              value={formData.officeState}
              onChange={handleChange}
              required
              className="dealers-input"
            />
          </div>
          <div className="add-category flex-col">
            <p>Office District</p>
            <input
              type="text"
              name="officeDistrict"
              value={formData.officeDistrict}
              onChange={handleChange}
              required
              className="dealers-input"
            />
          </div>
          <div className="add-category flex-col">
            <p>Office Name</p>
            <input
              type="text"
              name="officeName"
              value={formData.officeName}
              onChange={handleChange}
              required
              className="dealers-input"
            />
          </div>
        </div>
        <div className="add-product-name flex-col">
          <p>Shop Number</p>
          <input
            type="number"
            name="shopNumber"
            value={formData.shopNumber}
            // maxLength={7}
            onChange={handleChange}
            required
            className="dealers-input"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Mobile Number</p>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="dealers-input"
          />
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddDealers;
