import React from "react";
import "./Announcements.css";
import new_icon from "../../assets/frontend_assets/new.gif";
import { FaRegNewspaper } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Announcements = () => {
  const { t } = useTranslation();
  const newsItems = [t("news1"), t("news2"), t("news3"), t("news4")];

  return (
    <div className="Announcements" id="Announcements">
      <div className="Announcements-title">
        <p>
          <FaRegNewspaper className="news-icon" />
          <span>{t("updates")}</span>
        </p>
      </div>
      <div className="Announcements-content">
        <div className="scrolling-text">
          {newsItems.map((news, index) => (
            <span key={index} className="news-item">
              <img src={new_icon} alt="new_icon" />
              {news}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
