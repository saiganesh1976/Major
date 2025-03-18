import React from "react";
import "./Aboutus.css";
import ration_icon from "../../assets/frontend_assets/ration_icon.png";
import { useTranslation } from "react-i18next";

const Aboutus = () => {
  const { t } = useTranslation();

  return (
    <section className="aboutus" id="AboutUs">
      <div className="aboutus-container">
        <div className="aboutus-text">
          <h2>{t("about_us_title")}</h2>
          <p><b>{t("srvn_title")}</b> {t("aboutus_paragraph_1")}</p>
          <p>{t("aboutus_paragraph_2")}</p>
          <p>{t("aboutus_paragraph_3")}</p>
          <p>{t("aboutus_paragraph_4")}</p>
          <p>{t("aboutus_paragraph_5")}</p>
        </div>
        <div className="aboutus-image">
          <img src={ration_icon} alt="Ration Icon" />
        </div>
      </div>
    </section>
  );
};

export default Aboutus;