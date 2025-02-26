import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DealersList.css";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const DealersList = () => {
  const { t, i18n } = useTranslation();

  const [states, setStates] = useState(["Telangana", "Andhra Pradesh"]);
  const [districts, setDistricts] = useState({
    Telangana: [
      "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon",
      "Jayashankar Bhupalapally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
      "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar",
      "Mancherial", "Medak", "Medchal-Malkajgiri", "Nalgonda", "Nirmal",
      "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Siddipet",
      "Suryapet", "Vikarabad", "Warangal Urban", "Warangal Rural", "Wanaparthy",
      "Yadadri Bhuvanagiri"
    ],
    "Andhra Pradesh": [
      "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool",
      "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "West Godavari",
      "Visakhapatnam", "Vijayawada", "Tirupati", "Vizianagaram", "Kadapa",
      "Kakinada", "Amaravati", "Rajahmundry", "Nellore", "Chilakaluripet"
    ],
  });

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedOfficeName, setSelectedOfficeName] = useState("");
  const [dealers, setDealers] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [officeNames, setOfficeNames] = useState([]);
  const [rationCardHolders, setRationCardHolders] = useState([]);
  const [showRationDetails, setShowRationDetails] = useState(false);

  useEffect(() => {
    // Fetch all dealers initially
    axios 
      .get("http://localhost:5000/api/dealers/listDealers")
      .then((response) => {
        setDealers(response.data);
      })
      .catch((error) => console.error("Error fetching dealers:", error));
  }, []);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      axios
        .get("http://localhost:5000/api/dealers/listDealers", {
          params: { officeState: selectedState, officeDistrict: selectedDistrict },
        })
        .then((response) => {
          const uniqueOfficeNames = [
            ...new Set(response.data.map((dealer) => dealer.officeName)),
          ];
          setOfficeNames(uniqueOfficeNames);
        })
        .catch((error) => console.error("Error fetching office names:", error));
    }
  }, [selectedState, selectedDistrict]);

  useEffect(() => {
    if (selectedState && selectedDistrict && selectedOfficeName) {
      const filtered = dealers.filter(
        (dealer) =>
          dealer.officeState === selectedState &&
          dealer.officeDistrict === selectedDistrict &&
          dealer.officeName === selectedOfficeName
      );
      setFilteredDealers(filtered);
    }
  }, [selectedState, selectedDistrict, selectedOfficeName, dealers]);

  // Fetch ration card holders for the given shop number
  const fetchRationCardHolders = (shopNumber) => {
    axios
      .get(`http://localhost:5000/api/dealers/rationCardHolders/${shopNumber}`)
      .then((response) => {
        setRationCardHolders(response.data);
        setShowRationDetails(true);
      })
      .catch((error) => {
        console.error("Error fetching ration card holders:", error);
      });
  };

  return (
    <div className="dealers">
      <h1>{t("title-dealers")}</h1>
      <div className="dealers-form">
        <div>
          <label htmlFor="state">{t("selectState")}</label>
          <select id="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="dealers-select" >
            <option value="">--{t("selectState")}--</option>
            {states.map((state) => (
              <option key={state} value={state}> {state} </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="district">{t("selectDistrict")}</label>
          <select id="district" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}className="dealers-select"  >
            <option value="">--{t("selectDistrict")}--</option>
            {selectedState &&
              districts[selectedState]?.map((district) => (
                <option key={district} value={district}> {district} </option>
              ))}
          </select>
        </div>
        {selectedState && selectedDistrict && (
          <div>
            <label htmlFor="officeName">{t("selectOffice")}</label>
            <select id="officeName" value={selectedOfficeName} onChange={(e) => setSelectedOfficeName(e.target.value)} className="dealers-select"  >
              <option value="">--{t("selectOffice")}--</option>
              {officeNames.map((officeName) => (
                <option key={officeName} value={officeName}> {officeName} </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {filteredDealers.length > 0 ? (
        <div className="dealers-available">
          <h2>Ration Card Holders</h2>
          <table className="ration-table">
            <thead>
              <tr>
                {/* <th>Office Name</th> */}
                <th>{t("shopNumber")}</th>
                <th>{t("totalRationHolders")}</th>
                <th>{t("phoneNumber")}</th>
                <th>{t("viewDetails")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDealers.map((dealer) => {
                // Count the total number of ration card holders for the dealer's shop number
                const totalRationHolders = dealer.rationCardHolders
                  ? dealer.rationCardHolders.length+1
                  : 0;

                return (
                  <tr key={dealer.shopNumber}>
                    {/* <td>{dealer.officeName}</td> */}
                    <td>{dealer.shopNumber}</td>
                    <td>{totalRationHolders}</td>
                    <td>{dealer.mobileNumber}</td>
                    <td>
                      <button onClick={() => fetchRationCardHolders(dealer.shopNumber)} className="view-btn">
                      {t("viewDetails")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="dealers-err-msg">{t("noDealers")}</p>
      )}

      {/* Ration Card Holder Details Modal/Section */}
      {showRationDetails && (
        <div className="ration-details">
          <h2>{t("rationCardHolders")}</h2>
          <table className="dealers-table">
            <thead>
              <tr>
                <th>{t("rationCardNo")}</th>
                <th>{t("headOfFamily")}</th>
                <th>{t("cardType")}</th>
                <th>{t("consumerNo")}</th>
                <th>{t("gasConnection")}</th>
                <th>{t("members")}</th>
              </tr>
            </thead>
            <tbody>
              {rationCardHolders.map((holder) => (
                <tr key={holder.rationCardNo}>
                  <td>{holder.rationCardNo}</td>
                  <td>{holder.headOfFamily}</td>
                  <td>{holder.cardType}</td>
                  <td>{holder.consumerNo}</td>
                  <td>{holder.gasConnection}</td>
                  <td>
                    {holder.members.map((member, index) => (
                      <div key={index}>
                        {member.name}, {member.age}, {member.gender}, {member.relation}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setShowRationDetails(false)} className="close-btn">{t("close")}</button>
        </div>
      )}
    </div>
  );
};

export default DealersList;
