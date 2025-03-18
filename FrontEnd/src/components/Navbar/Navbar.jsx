import React, { useContext, useState } from "react";
import "./Navbar.css";
import ration_icon from "../../assets/frontend_assets/ration_icon.png";
import { CgProfile } from "react-icons/cg";
import bag_icon from "../../assets/frontend_assets/bag_icon.png";
import logout_icon from "../../assets/frontend_assets/logout_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { Context } from "../../Context/Context";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const Navbar = ({ setShowLogIn }) => {
  const { t, i18n } = useTranslation();
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownVisible, setIsLangDropdownVisible] = useState(false);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLangDropdownVisible(false);
  };

  return (
    <nav className="Navbar">
      <div className="Navbar-title">
        <img src={ration_icon} alt="Company Logo" className="Navbar-logo" />
        <div className="Navbar-title-text">
          <Link to="/">
            <p className="Navbar-main-title">{t("smart_ration_title")}</p> 
          </Link>
          <p className="Navbar-subtitle">{t("food_and_public_distribution")}</p> 
        </div>
      </div>

      <ul className={click ? "Navbar-menu Navbar-menu-active" : "Navbar-menu"}>
        <li>
          <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
            {t("home")}
          </Link>
        </li>

        {token && (
          <li>
            <Link to="/rationMart" onClick={() => setMenu("Ration Mart")} className={menu === "Ration Mart" ? "active" : ""}>
              {t("rationMart")}
            </Link>
          </li>
        )}

        <li className="dropdown">
          <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={menu === "Services" ? "active" : ""}>
            {t("services")}
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/Procurement" onClick={() => setIsDropdownOpen(false)}>{t("procurement")}</Link>
              <Link to="/NearestRationShops" onClick={() => setIsDropdownOpen(false)}>{t("find_pds")}</Link>
              <Link to="/UserDetails" onClick={() => setIsDropdownOpen(false)}>{t("ration_details")}</Link>
              <Link to="/emergencyRation" onClick={() => setIsDropdownOpen(false)}>{t("emergencyRation")}</Link>
              <Link to="/MonthlyDistributions" onClick={() => setIsDropdownOpen(false)}>{t("monthly_distribution")}</Link>
            </div>
          )}
        </li>

        <li>
          <Link to="/Download" onClick={() => setMenu("Download E-ration")} className={menu === "Download E-ration" ? "active" : ""}>
            {t("download")}
          </Link>
        </li>
        <li>
          <Link to="/DealersList" onClick={() => setMenu("DealersList")} className={menu === "DealersList" ? "active" : ""}>
            {t("reports")}
          </Link>
        </li>
        <li>
          <Link to="/Requisition" onClick={() => setMenu("Requisition")} className={menu === "Requisition" ? "active" : ""}>
            {t("requisition")}
          </Link>
        </li>
        <li>
          <Link to="/TollFree" onClick={() => setMenu("TollFree")} className={menu === "TollFree" ? "active" : ""}>
            {t("tollfree")}
          </Link>
        </li>
      </ul>

      <div className="Navbar-right">
        <div className="lang-dropdown">
          <IoLanguageSharp className="lang-icon" onClick={() => setIsLangDropdownVisible(!isLangDropdownVisible)} />
          {isLangDropdownVisible && (
            <ul className="lang-dropdown-menu">
              <li onClick={() => changeLanguage("te")}>తెలుగు</li>
              <li onClick={() => changeLanguage("en")}>English</li>
              <li onClick={() => changeLanguage("hi")}>हिन्दी</li>
            </ul>
          )}
        </div>

        <Link to="/cart">
          <FaCartPlus className="cart-icon" />
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </Link>

        {!token ? (
          <button onClick={() => setShowLogIn(true)} className="signLogin-btn">{t("sign_in")}</button>
        ) : (
          <div className="navbar-profile">
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

      <button className="Navbar-menu-icon" onClick={() => setClick(!click)}>
        {click ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
