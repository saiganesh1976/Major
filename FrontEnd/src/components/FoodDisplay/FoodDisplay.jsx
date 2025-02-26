import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { Context } from "../../Context/Context";
import FoodItem from "../FoodItem/FoodItem";
import { assets } from "../../assets/frontend_assets/assets";
import { useTranslation } from "react-i18next";
import axios from "axios";

const FoodDisplay = ({ category }) => {
  const { url } = useContext(Context);
  const { t } = useTranslation();
  const [foodList, setFoodList] = useState([]);
  const [Search, setSearch] = useState("");

  const onSearchHandler = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
  };

  // Fetch food list when category or cardType changes
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(url + "/api/food/list", {
          params: {
            category: category,
          },
        });

        if (response.data.success) {
          setFoodList(response.data.data);
        } else {
          setFoodList([]);
        }
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };
    fetchFoodList();
  }, [category]);

  // Filter by search input
  const filterList = foodList.filter((item) => {
    return item.name.toLowerCase().includes(Search);
  });

  return (
    <div className="food-display" id="food-display">
      <div className="food-search-field">
        <label htmlFor="search">Search:</label>
        <div className="search">
          <input
            type="text"
            value={Search}
            onChange={onSearchHandler}
            placeholder={t("food_display_search_placeholder")}
            className="food-search"
          />
          <img src={assets.search_icon} alt="" />
        </div>
      </div>
      <div className="food-display-list">
        {filterList.length > 0 ? (
          filterList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="No-product-found">
            {t("food_display_no_product_found")}
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
