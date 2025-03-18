import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserServices.css";


const UserServices = ({ url }) => {
  const { t } = useTranslation();

  const states = ["Telangana", "Andhra Pradesh", "Maharashtra"];
  const districts = {
    Telangana: ["Adilabad", "Hyderabad", "Warangal", "Nalgonda","Bhadradri Kothagudem"],
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  };

  const [rationCard, setRationCard] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [otp, setOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    setOtp(randomOtp);
    setEnteredOtp("");
    setIsOtpVerified(false);
  
    // Show OTP in an alert box
    alert(`Your OTP is: ${randomOtp}`);
  };
  

  const verifyOtp = () => {
    if (enteredOtp === otp?.toString()) {
      setIsOtpVerified(true);
      toast.success("OTP Verified Successfully!" );
    } else {
      toast.error("Invalid OTP! Please try again." );
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setUserData(null);

    try {
      const response = await axios.get(`${url}/api/ration/getRation`, {
        params: { rationCardNo: rationCard, district: district },
      });

      if (response.data?.user) {
        setUserData(response.data.user);
        toast.success("Ration Card Found Successfully!" );
      } else {
        setNotFound(true);
        toast.error("No Ration Card Found!" );
      }
    } catch (error) {
      setNotFound(true);
      toast.error("Error Fetching Data!" );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-services-container">
      <h1 className="title">{t("title-searchRation")}</h1>
      <form className="user-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label>{t("label.rationCardNumber")}</label>
          <input
            type="text"
            placeholder={t("label.rationCardNumber")}
            maxLength={12}
            value={rationCard}
            onChange={(e) => setRationCard(e.target.value)}
            required
            className="input-field"
          />
        </div>

        {/* State & District in One Row */}
        <div className="form-group row">
          <div className="form-half">
            <label>{t("selectState")}</label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setDistrict("");
              }}
              required
              className="select-field"
            >
              <option value="">{t("selectState")}</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="form-half">
            <label>{t("selectDistrict")}</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              disabled={!state}
              className="select-field"
            >
              <option value="">{t("selectDistrict")}</option>
              {districts[state]?.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* OTP Section */}
        <button type="button" className="btn-otp" onClick={generateOtp}>
          Generate OTP
        </button>

        {otp && (
          <div className="otp-section">
            <input
              type="text"
              className="input-field"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            <button type="button" className="btn-verify" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        )}

        <button type="submit" className="btn-submit" disabled={!isOtpVerified}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {notFound && <p className="error-message">No card found for Ration Card Number: {rationCard}</p>}

      {userData && (
        <div className="user-details">
          <h2>Ration Card Details</h2>
          {userData.familyPhoto && (
            <img
              src={`${url}/images/${userData.familyPhoto}`}
              alt="Family Photo"
              className="family-photo"
            />
          )}
          <table className="details-table">
            <tbody>
              <tr>
                <td><strong>Ration Card No:</strong></td>
                <td>{userData.rationCardNo}</td>
              </tr>
              <tr>
                <td><strong>Card Type:</strong></td>
                <td>{userData.cardType}</td>
              </tr>
              <tr>
                <td><strong>District:</strong></td>
                <td>{userData.district}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserServices;
