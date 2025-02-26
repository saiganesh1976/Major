import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import axios from "axios";
import { Context } from "../../Context/Context";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n"; 


const PlaceOrder = () => {
  const { t, i18n } = useTranslation();

  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(Context);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
      console.log(orderItems);
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("error");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
      alert("Please Login to Proceed !!");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      alert("Add to Cart to Proceed !!");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">{t("delivery_information")}</p>
        <div className="multi-fileds">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder={t("first_name")}
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder={t("last_name")}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder={t("email_address")}
          required
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder={t("street")}
          required
        />
        <div className="multi-fileds">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder={t("city")}
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder={t("state")}
            required
          />
        </div>
        <div className="multi-fileds">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder={t("zip_code")}
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder={t("country")}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder={t("phone")}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>{t("cart_total")}</h2>
          <div>
            <div className="cart-total-details">
              <p>{t("subtotal")}</p>
              <p>&#8377; {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>{t("delivery_fee")}</p>
              <p>&#8377; {getTotalCartAmount() === 0 ? 0 : 15}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>{t("total")}</p>
              <p>
                &#8377;
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 15}
              </p>
            </div>
            <button type="submit">{t("proceed_to_payment")}</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
