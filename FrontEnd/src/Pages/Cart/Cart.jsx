import React, { useContext, useState } from "react";
import "./Cart.css";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } =
    useContext(Context);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 15;

  // const [cardType,setCardType]=useState("None")

  // const getDiscountPercentage = (cardType) => {
  //   switch (cardType) {
  //     case "Antyodaya Anna Yojana (AAY)":
  //       return 80; // 10% discount
  //     case "Below Poverty Line (BPL)":
  //       return 50; // 5% discount
  //     case "Above Poverty Line (APL)":
  //       return 25; // 20% discount
  //     default:
  //       return 0;
  //   }
  // };

  // const discountPercentage = getDiscountPercentage(cardType);
  // const discountAmount = (subtotal * discountPercentage) / 100;
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className="cart">
      <h1>{t("cart")}</h1>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>{t("items")}</p>
          <p>{t("title-cart")}</p>
          <p>{t("price-cart")}</p>
          <p>{t("quantity-cart")}</p>
          <p>{t("total")}</p>
          <p>{t("remove")}</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>&#8377; {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>&#8377; {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cart-item-remove" > X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>{t("cart_total")}</h2>
          <div>
            <div className="cart-total-details">
              <p>{t("subtotal")}</p>
              <p>&#8377; {subtotal}</p>
            </div>
            <hr />
            {/* <div className="cart-total-details">
              <p>Govt. Supside amount</p>
              <p> - &#8377; {discountAmount}</p>
            </div>
            <hr /> */}
            <div className="cart-total-details">
              <p>{t("delivery_fee")}</p>
              <p> + &#8377; {deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>{t("total_amount")}</p>
              <p>
                &#8377;{" "}
                {/* {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 28.5} */}
                {totalAmount}
              </p>
            </div>
            <button onClick={() => navigate("/order")}>{t("proceed_to_checkout")}</button>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            <p>{t("ration_card_message")}</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code"  />
              {/* <select value={cardType} onChange={(e)=> setCardType(e.target.value)} className="cart-promocode-select">
                <option value="">---Select Ration Card Type---</option>
                <option value="Antyodaya Anna Yojana (AAY)">Antyodaya Anna Yojana (AAY)</option>
                <option value="Below Poverty Line (BPL)">Below Poverty Line (BPL)</option>
                <option value="Above Poverty Line (APL)">Above Poverty Line (APL)</option>
              </select> */}
              <button>{t("submit")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


