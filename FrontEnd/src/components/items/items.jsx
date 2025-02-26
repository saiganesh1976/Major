import React from "react";
import { useTranslation } from "react-i18next";
import "./items.css";
import { menu_list } from "../../assets/frontend_assets/assets.js";

const Items = ({ category, setCategory }) => {
  const { t } = useTranslation();

  return (
    <div className="items" id="items">
      <h2>{t("ration_categories")}</h2>
      {/* <p className="items-text">{t("items_description")}</p> */}

      <div className="items-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory((prev) => prev === item.menu_name ? "All" : item.menu_name )} key={index}  className="items-list-item" >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_image} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default Items;
