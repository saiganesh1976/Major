import React, { useState } from "react";
import "./RationMart.css";
import Items from "../../components/items/items";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const RationMart = () => {
  const [category, setCategory] = useState("All");
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("rationMart")}</h1>
      <div className="products-section">
        <Items category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
    </div>
  );
};

export default RationMart;
