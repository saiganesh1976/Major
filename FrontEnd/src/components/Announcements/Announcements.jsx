import React from "react";
import "./Announcements.css";
import new_icon from "../../assets/frontend_assets/new.gif";
import { FaRegNewspaper } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const Announcements = () => {
  const {t}= useTranslation();

  return (
    <div className="Announcements">
      <div className="Announcements-title">
        <p><FaRegNewspaper size={24}/> <span>{t("updates")}</span> </p>
      </div>
      <div>
        <marquee className="Notice" onmouseover="this.stop()" onmouseout="this.start()" >
          <img src={new_icon} alt="new_icon" />
          <span> {t("news1")} </span>
          <img src={new_icon} alt="new_icon" />
          <span> {t("news2")}</span>
          <img src={new_icon} alt="new_icon" />
          <span>{t("news1")} </span>
          <img src={new_icon} alt="new_icon" />
          <span> {t("news2")}</span>
        </marquee>
      </div>
    </div>
  );
};

export default Announcements;
