import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Download.css";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

const Download = () => {
  const [rationCardNumber, setRationCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const { t } = useTranslation();

  const handleSendOtp = () => {
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }
    const randomOTP = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(randomOTP);
    setOtpSent(true);
    toast.success(`OTP sent to ${email}`);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOTP) {
      setVerified(true);
      toast.success("OTP verified successfully.");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleDownload = async () => {
    if (!verified) {
      toast.error("Please verify OTP before downloading.");
      return;
    }
    if (!rationCardNumber.trim()) {
      toast.error("Please enter a valid Ration Card number.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/ration/getRation?rationCardNo=${rationCardNumber}`);
      const data = response.data;
      if (!data.success || !data.user) {
        toast.error("Ration card not found.");
        return;
      }

      const rationCardDetails = data.user;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("SMART RATION VITRAN AUR NIYANTRAN - SRVAN", 14, 15);
      doc.setFontSize(12);
      doc.text("Family Members Details", 14, 25);

      if (rationCardDetails.members?.length) {
        const familyData = rationCardDetails.members.map((member, index) => [
          index + 1,
          member.name || "N/A",
          member.age || "N/A",
          member.gender || "N/A",
          member.relation || "N/A",
        ]);

        doc.autoTable({
          startY: 30,
          head: [["S.No", "Name", "Age", "Gender", "Relation"]],
          body: familyData,
        });
      } else {
        doc.text("No family members available.", 14, 30);
      }

      doc.addPage();
      doc.text("SRVAN Ration Card Details", 14, 15);

      const rationCardData = [
        ["Ration Card Number", rationCardDetails.rationCardNo || "N/A"],
        ["Card Type", rationCardDetails.cardType || "N/A"],
        ["Application Status", rationCardDetails.applicationStatus || "N/A"],
        ["Office Name", rationCardDetails.officeName || "N/A"],
        ["FP Shop No", rationCardDetails.fpShopNo || "N/A"],
        ["Head of Family", rationCardDetails.headOfFamily || "N/A"],
        ["District", rationCardDetails.district || "N/A"],
      ];

      doc.autoTable({
        startY: 25,
        head: [["Field", "Value"]],
        body: rationCardData,
      });

      doc.save("rationCard.pdf");
      toast.success("Ration Card downloaded successfully!");
    } catch (error) {
      console.error("Error fetching ration card:", error);
      toast.error("Failed to fetch ration card details.");
    }
  };

  return (
    <div className="download-container">
      <h1>{t("title-download")}</h1>
      <form className="download-form">
        <div className="form-group">
          <label htmlFor="rationCardNumber">{t("label.rationCardNumber")}</label>
          <input
            type="text"
            id="rationCardNumber"
            value={rationCardNumber}
            onChange={(e) => setRationCardNumber(e.target.value)}
            placeholder={t("placeholder-download.rationCardNumber")}
            required
          />

          <label htmlFor="email">Registered Email-Id</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter registered Email-ID"
            required
          />

          <label htmlFor="OTP">Enter OTP</label>
          <div className="download-form-group">
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            {otpSent ? (
              <button type="button" onClick={handleVerifyOtp} className="otp-btn">
                Verify OTP
              </button>
            ) : (
              <button type="button" onClick={handleSendOtp} className="otp-btn">
                Send OTP
              </button>
            )}
          </div>
        </div>
        <button type="button" onClick={handleDownload} className="download-button">
          {t("button.download")}
        </button>
      </form>
    </div>
  );
};

export default Download;
