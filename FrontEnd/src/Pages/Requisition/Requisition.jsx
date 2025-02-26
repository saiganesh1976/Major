import React, { useState } from "react";
import axios from "axios";
import "./Requisition.css";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const RequisitionForm = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    state: "",
    requisitionNumber: "",
    timePeriodFrom: "",
    timePeriodTo: "",
    quantity: "",
    rationType: "",
    remarks: "",
  });

  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const rationTypes = ["Rice", "Wheat", "Sugar", "Oil"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFeedback({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { state, requisitionNumber, timePeriodFrom, timePeriodTo, quantity, rationType } = formData;
    if (!state || !requisitionNumber || !timePeriodFrom || !timePeriodTo || !quantity || !rationType) {
      setFeedback({ message: "All fields are required!", type: "error" });
      return;
    }

    if (isNaN(quantity)) {
      setFeedback({ message: "Quantity must be a numeric value.", type: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/requisition/addRequisition", formData);

      if (response.data.success) {
        setFormData({
          state: "",
          requisitionNumber: "",
          timePeriodFrom: "",
          timePeriodTo: "",
          quantity: "",
          rationType: "",
          remarks: "",
        });

        setFeedback({ message: "Requisition submitted successfully!", type: "success" });
      } else {
        setFeedback({ message: "Something went wrong. Please try again.", type: "error" });
      }
    } catch (error) {
      setFeedback({ message: "An error occurred while submitting. Please try again.", type: "error" });
    }
  };

  return (
    <div className="requisition-form">
      <h1>{t("Requisition Form - PDS")}</h1>
      {feedback.message && (
        <div className={feedback.type === "error" ? "error-message" : "success-message"}>
          {feedback.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <label htmlFor="state">{t("selectState")}</label>
            <input type="text" id="state" value={formData.state} onChange={handleChange} required placeholder={t("selectState")}/>
          </div>
          <div>
            <label htmlFor="requisitionNumber">{t("Requisition Number")}</label>
            <input type="text" id="requisitionNumber" value={formData.requisitionNumber} onChange={handleChange} required placeholder={t("Requisition Number")} />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="timePeriodFrom">{t("Time Period From")}</label>
            <input type="date" id="timePeriodFrom" value={formData.timePeriodFrom} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="timePeriodTo">{t("Time Period Tor")}</label>
            <input type="date" id="timePeriodTo" value={formData.timePeriodTo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="quantity">{t("Demand Quantity (in Mts.)")}</label>
            <input type="text" id="quantity" value={formData.quantity} onChange={handleChange} required placeholder={t("Demand Quantity (in Mts.)")}/>
          </div>
          <div>
            <label htmlFor="rationType">{t("Type of Ration")}</label>
            <select id="rationType" value={formData.rationType} onChange={handleChange} required>
              <option value="">-- Select Type --</option>
              {rationTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="remarks">{t("remark")}</label>
          <textarea id="remarks" rows="4" value={formData.remarks} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">{t("submit")}</button>
      </form>
    </div>
  );
};

export default RequisitionForm;