import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useTranslation } from "react-i18next";

const AppDownload = () => {
  const { t } = useTranslation();

  return (
    <div className="app-download">
      <p className="app-download-text">{t("download_experience")}</p>
      <div className="app-download-platforms">
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
          <img src={assets.play_store} alt="Download on Play Store" />
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
          <img src={assets.app_store} alt="Download on App Store" />
        </a>
      </div>
    </div>
  );
};

export default AppDownload;
