import React, { useContext, useEffect } from "react";
import "./VerifyOrder.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../../Context/Context";
const VerifyOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  // console.log(success,orderId);
  
  const { url } = useContext(Context);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,orderId    });
    if (response.data.success) {
      navigate("/MyOrders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner">
        {/* <h1>Success</h1> */}
      </div>
    </div>
  );
};

export default VerifyOrder;
