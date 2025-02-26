import React from "react";
import Location_icon from "../../assets/frontend_assets/location.png";
import sms_icon from "../../assets/frontend_assets/sms.png";
import Recepits_icon from "../../assets/frontend_assets/receipt.png";
import Language_icon from "../../assets/frontend_assets/Multilanguage.png";
import { useTranslation } from "react-i18next"; 
import "./Features.css";

const Features = () => {
  const { t } = useTranslation(); 

  return (
    <div className="features">
      <h1>{t("features_title")}</h1>
      <div className="features-icons">
        <div className="features-icons-item">
          <img src={Language_icon} alt="" />
          <p>{t("multilingual_support")}</p>
        </div>
        <div className="features-icons-item">
          <img src={sms_icon} alt="" />
          <p>{t("real_time_sms_alerts")}</p>
        </div>
        <div className="features-icons-item">
          <img src={Recepits_icon} alt="" />
          <p>{t("digital_receipts")}</p>
        </div>
        <div className="features-icons-item">
          <img src={Location_icon} alt="" />
          <p>{t("nearest_pds_service_points")}</p> 
        </div>
      </div>
    </div>
  );
};

export default Features;
