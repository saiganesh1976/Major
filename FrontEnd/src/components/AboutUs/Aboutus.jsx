import React from "react";
import "./Aboutus.css";
import ration_icon from "../../assets/frontend_assets/ration_icon.png";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

const Aboutus = () => {
  const { t } = useTranslation(); // Get the translation function

  return (
    <div className="aboutus" id="AboutUs">
      <h1>{t("about_us_title")}</h1> {/* Translated title */}
      <div className="aboutus-content">
        <div className="aboutus-left">
          <p className="aboutus-text">
            <b>{t("srvn_title")}</b> {/* Translated SRVAN title */}
            {t("aboutus_paragraph_1")}
          </p>
          <p className="aboutus-text">
            {t("aboutus_paragraph_2")}
          </p>
          <p>{t("aboutus_paragraph_3")}</p>
          <p>{t("aboutus_paragraph_4")}</p>
          <p className="aboutus-text">
            {t("aboutus_paragraph_5")}
          </p>
        </div>
        <div className="aboutus-right">
          <img src={ration_icon} alt="ration_icon" />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
