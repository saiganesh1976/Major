import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { Context } from "../../Context/Context";
import { assets } from "../../assets/frontend_assets/assets";
const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(Context);

  const fetchorders = async () => {
    const response = await axios.post(
      url + "/api/order/userOrders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchorders();
    }
  }, [token]);

  return (
    <div className="My-Orders">
      <h2>My Orders</h2>
      <div className="orders-container">
        {data.map((order, index) => {
          return (
            <div key={index} className="myOrders-order">
              <img src={assets.parcel_icon} alt="parcel_icon" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>&#8377; {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
