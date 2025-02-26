import React, { useState } from "react";
import "./Procurement.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 


const Procurement = () => {

  const { t, i18n } = useTranslation();


  const [formData, setFormData] = useState({
    name: "",
    aadharNo: "",
    crop: "",
    quantity: "",
    date: "",
    price: "",
    remark: "",
  });

  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const crops = [
    "Rice",
    "Wheat",
    "Coarse Grains",
    "Pulses",
    "Sugar",
    "Maize",
    "Jowar",
    "Bajra",
    "Ragi",
    "Barley",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFeedback({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, aadharNo, crop, quantity, date, price } = formData;

    if (!name || !aadharNo || !crop || !quantity || !date || !price) {
      setFeedback({ message: "All fields are required!", type: "error" });
      return;
    }

    if (!/^\d{12}$/.test(aadharNo)) {
      setFeedback({
        message: "Aadhar number must be exactly 12 digits.",
        type: "error",
      });
      return;
    }

    if (isNaN(quantity) || isNaN(price)) {
      setFeedback({
        message: "Quantity and price must be numeric values.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/farmers/addFarmersData",
        formData
      );

      if (response.data.success) {
        setFormData({
          name: "",
          aadharNo: "",
          crop: "",
          quantity: "",
          date: "",
          price: "",
          remark: "",
        });

        setFeedback({
          message: "Procurement details submitted successfully!",
          type: "success",
        });
      } else {
        setFeedback({
          message: "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setFeedback({
        message: "An error occurred while submitting. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="procurement">
      <h1>{t("title")}</h1>

      <div className="description">
        <p>{t("description")}</p>
      </div>

      <div className="requestdata-form">
        <form className="procurement-form" onSubmit={handleSubmit}>
          <div className="formdata-row">
            <div>
              <label htmlFor="name">{t("name")}</label>
              <input
                type="text"
                id="name"
                placeholder={t("placeholder.name")}
                value={formData.name}
                onChange={handleChange}
                className="procurement-input"
                required
              />
            </div>

            <div>
              <label htmlFor="aadharNo">{t("aadharNo")}</label>
              <input
                type="text"
                id="aadharNo"
                placeholder={t("placeholder.aadharNo")}
                value={formData.aadharNo}
                onChange={handleChange}
                className="procurement-input"
                required
              />
            </div>
          </div>

          <div className="formdata-row">
            <div>
              <label htmlFor="crop">{t("crop")}</label>
              <select
                id="crop"
                value={formData.crop}
                onChange={handleChange}
                required
                className="crop-select"
              >
                <option value="">Select Crop</option>
                {crops.map((crop, index) => (
                  <option key={index} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity">{t("quantity")}</label>
              <input
                type="text"
                id="quantity"
                placeholder={t("placeholder.quantity")}
                value={formData.quantity}
                onChange={handleChange}
                className="procurement-input"
                required
              />
            </div>
          </div>

          <div className="formdata-row">
            <div>
              <label htmlFor="date">{t("date")}</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="procurement-input"
                required
              />
            </div>
            <div>
              <label htmlFor="price">{t("price")}</label>
              <input
                type="text"
                id="price"
                placeholder={t("placeholder.price")}
                value={formData.price}
                onChange={handleChange}
                className="procurement-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="remark">{t("remark")}</label>
            <textarea
              id="remark"
              rows={4}
              placeholder={t("placeholder.remark")}
              value={formData.remark}
              className="procurement-input"
              onChange={handleChange}
            />
          </div>

      {feedback.message && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
          <button type="submit" className="smt-btn">
          {t("submit")}
          </button>
        </form>
      </div>

    </div>
  );
};

export default Procurement;
