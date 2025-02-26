import React from "react";
import "./Footer.css";
import srvan_logo from "../../assets/frontend_assets/ration_icon.png"; 
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer" id="contactus">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
          <div className="Footer-avatar">
            <img src={srvan_logo} alt="SRVAN-logo" className="Footer-logo" />
            <p className="Footer-title">SRVAN PORTAL</p>
          </div>
          <p>
            Empowering citizens with a seamless Ration Distribution System. 
            SRVAN Portal ensures transparency, efficiency, and accessibility for all.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://linkedin.com">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
            <a href="https://twitter.com">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div className="footer-center">
          <h3>QUICK LINKS</h3>
          <ul>
            <Link to="/">{t("footer_home")}</Link>
            <Link to="/about">{t("footer_about")}</Link>
            <Link to="/rationMart">{t("rationMart")} </Link>
            <Link to="/emergencyRation">{t("emergencyRation")}</Link>
            <Link to="/MonthlyDistributions">{t("monthly_distribution")}</Link>
            <Link to="/PrivacyPolicy">{t("footer_privacy")}</Link>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h2>Contact Us</h2>
          <ul>
            <li>📞 +91-6305279018</li>
            <li>📧 support@srvanportal.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 &copy; SRVAN Portal - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
