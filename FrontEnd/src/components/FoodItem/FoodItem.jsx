import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Context } from "../../Context/Context";
import { useTranslation } from "react-i18next";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(Context);
  const { t } = useTranslation();

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + "/images/" + image} alt={url + "/images/" + image} />
        {cartItems && cartItems[id] ? (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove_icon_red" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add_icon_green" />
          </div>
        ) : (
          <div className="add" onClick={() => addToCart(id)}>
            {t('food_item_add_to_cart')} <img src={assets.add_icon_white} alt="add_icon_white" className="add-icon" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating_starts" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">&#8377; {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
