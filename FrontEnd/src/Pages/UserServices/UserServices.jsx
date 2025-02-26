import React, { useState } from "react";
import "./UserServices.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const UserServices = ({ url }) => {
  const { t, i18n } = useTranslation();

  const states = ["Telangana", "Andhra Pradesh", "Maharastra"]; // List of states
  const districts = {
    Telangana: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar Bhupalapally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem Asifabad",
      "Mahabubabad",
      "Mahabubnagar",
      "Mancherial",
      "Medak",
      "Medchal-Malkajgiri",
      "Nalgonda",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Rangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Warangal (Urban)",
      "Warangal (Rural)",
      "Wanaparthy",
      "Yadadri Bhuvanagiri",
    ],
    "Andhra Pradesh": [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Krishna",
      "Kurnool",
      "Prakasam",
      "Srikakulam",
      "Sri Potti Sriramulu Nellore",
      "West Godavari",
      "Visakhapatnam",
      "Vijayawada",
      "Tirupati",
      "Vizianagaram",
      "Kadapa",
      "Kakinada",
      "Amaravati",
      "Rajahmundry",
      "Nellore",
      "Chilakaluripet",
    ],
    Maharastra: ["No Data"],
  };

  const [rationCard, setRationCard] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setUserData(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/ration/getRation`,
        {
          params: { rationCardNo: rationCard, district: district },
        }
      );

      //console.log("API Response:", response.data); // Debug log

      if (response.data && response.data.user) {
        setUserData({
          ...response.data.user,
          members: response.data.user.members || [],
        });
      } else {
        setNotFound(true);
      }
    } catch (error) {
      // console.error("API Error:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-details">
      <h1>{t("title-searchRation")}</h1>
      <form className="user-details-form" onSubmit={handleSearch}>
        <div className="user-details-form-section">
          <div className="user-details-form-item">
            <p>{t("label.rationCardNumber")}</p>
            <input type="text" placeholder={t("label.rationCardNumber")} maxLength={10} value={rationCard} onChange={(e) => setRationCard(e.target.value)} required/>
          </div>
          <div className="user-details-multifields">
            <div className="user-details-form-item">
              <p>{t("selectState")}</p>
              <select value={state} onChange={(e) => { setState(e.target.value); setDistrict(""); }} required >
                <option value="">{t("selectState")}</option>
                {states.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div className="user-details-form-item">
              <p>{t("selectDistrict")}</p>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} required disabled={!state} >
                <option value="">{t("selectDistrict")}</option>
                {districts[state]?.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="user-details-submit-btn">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {notFound && <p>No card found for Ration Card Number: {rationCard}</p>}
      {userData && (
        <div className="user-details-display">
          <h2>Ration Card Details</h2>

          {/* Display Family Photo */}
          {userData.familyPhoto && (
            <div className="image-container">
              <img src={`http://localhost:5000/images/${userData.familyPhoto}`}  alt="Family Photo" className="family-photo" />
            </div>
          )}

          <table className="details-table">
            <tbody>
              <tr>
                <td>
                  <strong>Ration Card No:</strong>
                </td>
                <td>{userData.rationCardNo}</td>
                <td>
                  <strong>Card Type:</strong>
                </td>
                <td>{userData.cardType}</td>
              </tr>
              <tr>
                <td>
                  <strong>Application Status:</strong>
                </td>
                <td>{userData.applicationStatus}</td>
                <td>
                  <strong>Application No:</strong>
                </td>
                <td>{userData.applicationNo}</td>
              </tr>
              <tr>
                <td>
                  <strong>Office Name:</strong>
                </td>
                <td>{userData.officeName}</td>
                <td>
                  <strong>FPShop No:</strong>
                </td>
                <td>{userData.fpShopNo}</td>
              </tr>
              <tr>
                <td>
                  <strong>Head of Family:</strong>
                </td>
                <td>{userData.headOfFamily}</td>
                <td>
                  <strong>District:</strong>
                </td>
                <td>{userData.district}</td>
              </tr>
              <tr>
                <td>
                  <strong>Gas Connection:</strong>
                </td>
                <td>{userData.gasConnection}</td>
                <td>
                  <strong>Consumer No:</strong>
                </td>
                <td>{userData.consumerNo}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>

          <br />
          <br />
          <h2>Ration Card Member Details</h2>
          {userData?.members?.length > 0 ? (
            <table className="details-table">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Member Name</th>
                  <th>Age</th>
                  <th>Relation</th>
                </tr>
              </thead>
              <tbody>
                {userData.members.map((member, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.age}</td>
                    <td>{member.relation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No members found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserServices;
