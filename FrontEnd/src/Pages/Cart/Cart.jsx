import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(Context);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 15;
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className="cart">
      <h1>{t("cart")}</h1>
      <div className="cart-items">
        <div className="cart-items-title">
          <p> {t("items")}</p>
          <p> {t("title-cart")}</p>
          <p> {t("price-cart")}</p>
          <p> {t("quantity-cart")}</p>
          <p> {t("total")}</p>
          <p> {t("remove")}</p>
        </div>
        <hr />
        <div className="cart-responsive">
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index} className="cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p><FontAwesomeIcon icon={faRupeeSign} /> {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p><FontAwesomeIcon icon={faRupeeSign} /> {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cart-item-remove">
                    <FontAwesomeIcon icon={faTrash} />
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>{t("cart_total")}</h2>
          <div>
            <div className="cart-total-details">
              <p>{t("subtotal")}</p>
              <p><FontAwesomeIcon icon={faRupeeSign} /> {subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>{t("delivery_fee")}</p>
              <p> + <FontAwesomeIcon icon={faRupeeSign} /> {deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>{t("total_amount")}</p>
              <p><FontAwesomeIcon icon={faRupeeSign} /> {totalAmount}</p>
            </div>
            <button onClick={() => navigate("/order")}>{t("proceed_to_checkout")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
