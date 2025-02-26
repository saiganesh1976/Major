import React, { useState } from "react";
import "./EmergencyRation.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 


const EmergencyRation = () => {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    rationNo: "",
    aadhaarNo: "",
    address: "",
    message: "",
  });

  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFeedback({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, rationNo, aadhaarNo, address } = formData;

    if (!name || !rationNo || !aadhaarNo || !address) {
      setFeedback({ message: "All fields are required!", type: "error" });
      return;
    }

    if (!/^\d{12}$/.test(aadhaarNo)) {
      setFeedback({
        message: "Aadhaar number must be exactly 12 digits.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/emergencyRation/addData",
        formData
      );

      if (response.data.success) {
        setFormData({
          name: "",
          rationNo: "",
          aadhaarNo: "",
          address: "",
          message: "",
        });
        setFeedback({
          message: "Request submitted successfully!",
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
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="emergency-ration">
      <h1>{t("emergencyRation")}</h1>
      <div className="description">
        <p>
        {t("description-emergency")}
        </p>
      </div>
      <div className="request-form">
        <form className="emergency-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="name">{t("name")}</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("placeholder.name")}
                required
                className="request-form-input"
              />
            </div>
            <div>
              <label htmlFor="rationNo">{t("rationCardNo")}:</label>
              <input
                type="text"
                id="rationNo"
                value={formData.rationNo}
                onChange={handleChange}
                placeholder={t("rationCardNo")}
                required
                className="request-form-input"
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="aadhaarNo">{t("aadharNo")}</label>
              <input
                type="text"
                id="aadhaarNo"
                value={formData.aadhaarNo}
                onChange={handleChange}
                placeholder={t("placeholder.aadharNo")}
                required
                className="request-form-input"
              />
            </div>
          </div>
          <div className="form-group1">
            <label htmlFor="address">{t("address")}</label>
            <textarea
              id="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              placeholder={t("placeholder.address")}
              required
              className="request-form-input"
            />
          </div>
          <div className="form-group1">
            <label htmlFor="message">{t("remark")}</label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={t("placeholder.remark")}
              className="request-form-input"
            />
          </div>
          {feedback.message && (
            <div
              className={
                feedback.type === "error" ? "error-message" : "success-message"
              }
            >
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

export default EmergencyRation;
