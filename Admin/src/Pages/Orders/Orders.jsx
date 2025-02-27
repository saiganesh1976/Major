import React from "react";
import "./Orders.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import parcel_icon from "../../assets/admin_assets/parcel_icon.png";

const Orders = () => {
  const url = "https://major-backend-5gti.onrender.com";
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    // console.log(event, orderId);
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>Orders Page</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div ket={index} className="order-item">
            <img src={parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <div className="order-item-address">
                <p className="order-item-name">{order.address.firstName.toUpperCase() + " " + order.address.lastName.toUpperCase()}</p>
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city +", " + order.address.state +", " + order.address.country +", " + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>&#8377; {order.amount}</p>
            <select className="order-item-select" onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
