import React, { useContext, useState } from "react";
import axios from "axios";
import "./LoginPopUp.css";

import { assets } from "../../assets/frontend_assets/assets";
import { Context } from "../../Context/Context";

const LoginPopUp = ({ setShowLogIn }) => {
  
  const { url, setToken } = useContext(Context);

  // To Store the data in Variables
  const [currState, setCurrState] = useState("SignUp");   // initial state of user
  const [data, setData] = useState({
    name: "",
    rationCardNo:"",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));  // {...data} --> upadate to previous data
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    //  API request based on the currentState
    if (currState === "LogIn") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    // Handling the Response
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogIn(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="LogInPopUp">
      <form className="loginpopup-container" onSubmit={onLogin}>

        <div className="loginpopup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogIn(false)} src={assets.cross_icon} alt="cross_icon"/>
        </div>

        {/* if user already loggedIn Name field is not required i.e. if current state is Login emty div*/}
        <div className="loginpopup-input">
          {
            currState === "LogIn" ? (<></>) : (
              <>
                <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Enter Your Name" required/>          
                <input type="Number" name="rationCardNo" onChange={onChangeHandler} value={data.rationCardNo} placeholder="Enter Your Ration Card number" required/>
              </>
            )
          }

          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Enter Your Email" required/>
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Password" required/>
        </div>

        {/* Button text Should be changed based on the current state */}
        <button className="loginpopup-button" type="submit">
          {currState === "SignUp" ? "Create account" : "LogIn"}
        </button>

        <div className="loginpopup-condition">
          <input type="checkbox" required />
          <p>Accept all Terms and Conditions</p>
        </div>


        {/* If currentState is signUp --> if user has already has acc. change state to LOGIN. if currentState is LogIn --> changeState to SIGNUP */}
        {
          currState === "LogIn" ? (<p>Create a new account? <span onClick={() => setCurrState("SignUp")}>Click Here</span></p>) : 
                                  (<p>Already have an account?<span onClick={() => setCurrState("LogIn")}>Login Here</span></p>)
        }
      </form>
    </div>
  );
};

export default LoginPopUp;
