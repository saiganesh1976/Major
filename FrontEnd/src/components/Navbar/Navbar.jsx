import React, { useContext, useState } from "react";
import "./Navbar.css";
import ration_icon from "../../assets/frontend_assets/ration_icon.png";
import { CgProfile } from "react-icons/cg";
import bag_icon from "../../assets/frontend_assets/bag_icon.png";
import logout_icon from "../../assets/frontend_assets/logout_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { IoLanguageSharp } from "react-icons/io5";
import { Context } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 
import { FaTimes, FaBars } from "react-icons/fa";


const Navbar = ({ setShowLogIn }) => {
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownVisible, setIsLangDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick((prev) => !prev);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLangDropdownVisible(false);
  };

  const handleImageClick = () => {
    setIsLangDropdownVisible(!isLangDropdownVisible);
  };

  return (
    <div className="Navbar">
      <div className="Navbar-title">
        <img src={ration_icon} alt="Company-logo" className="Navbar-logo" />
        <div className="Navbar-title-subsection">
          <Link to="/">
            <p className="Navbar-main-title">{t("smart_ration_title")}</p> 
          </Link>
          <p className="Navbar-subtitle">{t("food_and_public_distribution")}</p> 
        </div>
      </div>

      <ul className="Navbar-menu">
        <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
          {t("home")}
        </Link>

        { token &&
          <Link to="/rationMart" onClick={() => setMenu("Ration Mart")} className={menu === "Ration Mart" ? "active" : ""}>
            {t("rationMart")}
          </Link>
         }

        <div className="dropdown">
          <div onClick={() => { setIsDropdownOpen(!isDropdownOpen); setMenu("Services"); }} className={menu === "Services" ? "active" : ""}>
            {t("services")}
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/Procurement" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
              {t("procurement")}
              </Link>
              <Link to="/NearestRationShops" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                {t("find_pds")}
              </Link>
              <Link to="/UserDetails" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                {t("ration_details")}
              </Link>
               <Link to="/emergencyRation" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
               {t("emergencyRation")}
              </Link>
              <Link to="/MonthlyDistributions" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                {t("monthly_distribution")}
              </Link>
            </div>
          )}
        </div>

        <Link to="/Download" onClick={() => setMenu("Download E-ration")} className={menu === "Download E-ration" ? "active" : ""}>
          {t("download")}
        </Link>
        <Link to="/DealersList" onClick={() => setMenu("DealersList")} className={menu === "DealersList" ? "active" : ""}>
          {t("reports")}
        </Link>
        <Link to="/Requisition" onClick={() => setMenu("Requisition")} className={menu === "Requisition" ? "active" : ""}>
          {t(  "requisition")}
        </Link>
        <Link to="/TollFree" onClick={() => setMenu("TollFree")} className={menu === "TollFree" ? "active" : ""}>
          {t("tollfree")}
        </Link>
      </ul>

      <div className="Navbar-right">
        <div className="Navbar-icon">
          <div className="lang-dropdown">
            {/* <IoLanguageSharp size={24} className="lang-icon" onClick={handleImageClick} /> */}
            <IoLanguageSharp className="lang-icon" onClick={handleImageClick} />
            {isLangDropdownVisible && (
              <ul className="lang-dropdown-menu">
                <li className="lang-option" onClick={() => changeLanguage("te")}>తెలుగు</li>
                <li className="lang-option" onClick={() => changeLanguage("en")}>English</li>
                <li className="lang-option" onClick={() => changeLanguage("hi")}>हिन्दी</li>
              </ul>
            )}
          </div>

          <Link to="/cart">
            {/* <FaCartPlus size={24} className="cart-icon" /> */}
            <FaCartPlus className="cart-icon" />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </Link>

          {!token ? (
            <button onClick={() => setShowLogIn(true)} className="signLogin-btn">{t("sign_in")}</button>
          ) : (
            <div className="navbar-profile">
              {/* <CgProfile size={34} /> */}
              <CgProfile className="profile-icon" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/MyOrders")}>
                  <img src={bag_icon} alt="" />
                  <p>{t("orders")}</p>
                </li>
                <hr />
                <li onClick={logOut}>
                  <img src={logout_icon} alt="" />
                  <p>{t("logout")}</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      <button className="Navbar-menu-icon" onClick={handleClick} > {click ? <FaTimes /> : <FaBars />} </button>
      </div>
        

        {click && (
        <div className="Navbar-phone-menu">
          <ul className="Navbar-phone-menu-links">
            <li className="Navbar-phone-menu-link">
              <Link to="/" onClick={handleClick}>
              {t("home")}
              </Link>
            </li>
            <li className="Navbar-phone-menu-link">
              { token &&
                <Link to="/rationMart" onClick={handleClick}>
                  {t("rationMart")}
                </Link>
              }
            </li>
            <li className="Navbar-phone-menu-link">
              <Link to="/Download" onClick={handleClick}>
              {t("download")}
              </Link>
            </li>
            <li className="Navbar-phone-menu-link">
              <Link to="/DealersList" onClick={handleClick}>
              {t("reports")}
              </Link>
            </li>
            <li className="Navbar-phone-menu-link">
              <Link to="/Requisition" onClick={handleClick}>
              {t(  "requisition")}
              </Link>
            </li>
            <li className="Navbar-phone-menu-link">
              <Link to="/TollFree" onClick={handleClick}>
              {t("tollfree")}
              </Link>
            </li>
            <li className="Navbar-phone-menu-link">
              <Link onClick={() => { setIsDropdownOpen(!isDropdownOpen)}}>
                {t("services")}
              </Link>
            </li>
          {isDropdownOpen && (
            <div className="dropdown-phone-menu">
              <Link to="/Procurement" className="dropdown-phone-item" onClick={() => setIsDropdownOpen(false)}>
              {t("procurement")}
              </Link>
              <Link to="/NearestRationShops" className="dropdown-phone-item" onClick={() => setIsDropdownOpen(false)}>
                {t("find_pds")}
              </Link>
              <Link to="/UserDetails" className="dropdown-phone-item" onClick={() => setIsDropdownOpen(false)}>
                {t("ration_details")}
              </Link>
               <Link to="/emergencyRation" className="dropdown-phone-item" onClick={() => setIsDropdownOpen(false)}>
               {t("emergencyRation")}
              </Link>
              <Link to="/MonthlyDistributions" className="dropdown-phone-item" onClick={() => setIsDropdownOpen(false)}>
                {t("monthly_distribution")}
              </Link>
            </div>
          )}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Navbar;
