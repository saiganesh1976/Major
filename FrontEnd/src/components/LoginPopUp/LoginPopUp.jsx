import React, { useContext, useState } from "react";
import axios from "axios";
import "./LoginPopUp.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Context } from "../../Context/Context";

const LoginPopUp = ({ setShowLogIn }) => {
  const { url, setToken } = useContext(Context);
  const [currState, setCurrState] = useState("SignUp");   
  const [data, setData] = useState({
    name: "",
    rationCardNo: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const newUrl = `${url}/api/user/${currState === "LogIn" ? "login" : "register"}`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogIn(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="LogInPopUp">
      <form className="loginpopup-container" onSubmit={onLogin}>
        <div className="loginpopup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogIn(false)} src={assets.cross_icon} alt="close" />
        </div>

        <div className="loginpopup-input">
          {currState === "SignUp" && (
            <>
              <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Enter Your Name" required />
              <input type="number" name="rationCardNo" onChange={onChangeHandler} value={data.rationCardNo} placeholder="Enter Your Ration Card Number" required />
            </>
          )}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Enter Your Email" required />
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Password" required />
        </div>

        <button className="loginpopup-button" type="submit">
          {currState === "SignUp" ? "Create Account" : "Log In"}
        </button>

        <div className="loginpopup-condition">
          <input type="checkbox" required />
          <p>Accept all Terms and Conditions</p>
        </div>

        <p>
          {currState === "LogIn" ? "Create a new account? " : "Already have an account? "}
          <span onClick={() => setCurrState(currState === "LogIn" ? "SignUp" : "LogIn")}>
            {currState === "LogIn" ? "Click Here" : "Login Here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopUp;
