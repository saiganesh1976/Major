import React, { useContext } from "react";
import "./Footer.css";
import srvan_logo from "../../assets/frontend_assets/ration_icon.png";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Context } from "../../Context/Context";

const Footer = () => {
  const { token } = useContext(Context);
  const { t } = useTranslation();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname === "/" && path === "about") {
      document.getElementById("AboutUs").scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/" && path === "updates") {
      document.getElementById("Announcements").scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer" id="contactus">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <div className="footer-brand">
            <img src={srvan_logo} alt="SRVAN Logo" className="footer-logo" />
            <h2 className="footer-title">SRVAN PORTAL</h2>
          </div>
          <p className="footer-description">
            Providing a seamless Public Distribution System experience.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>

        {/* Center Section - Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" onClick={() => handleNavigation("about")}>{t("footer_about")}</Link></li>
            <li><Link to="/" onClick={() => handleNavigation("updates")}>{t("Latest_Updates")}</Link></li>
            {token && <li><Link to="/rationMart">{t("rationMart")}</Link></li>}     
            <li><Link to="/emergencyRation">{t("emergencyRation")}</Link></li>
            <li><Link to="/MonthlyDistributions" onClick={() => handleNavigation("monthly")}>{t("monthly_distribution")}</Link></li>
            <li><Link to="/PrivacyPolicy">{t("footer_privacy")}</Link></li>
            <li><Link to="/grievances">Grievances</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Right Section - Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li><FaPhoneAlt /> +91-6305279018</li>
            <li><FaEnvelope /> support@srvanportal.com</li>
            <li><FaMapMarkerAlt /> Hyderabad, India</li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />
      <p className="footer-copyright">        
        &copy; 2025 SRVAN Portal | Empowering Ration Distribution with Transparency
      </p>
    </footer>
  );
};

export default Footer;