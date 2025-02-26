import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import ChatBot from "./components/ChatBot/ChatBot";
import Cart from "./Pages/Cart/Cart";
import Download from "./Pages/DownloadERation/Download";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import MonthlyDistributions from "./Pages/MonthlyDistributions/MonthlyDistributions";
import UserDetails from "./Pages/UserServices/UserServices";
import NearestRationShops from "./Pages/NearestRationShops/NearestRationShops";
import DealersList from "./Pages/DealersList/DealersList";
import MyOrders from "./Pages/MyOrders/MyOrders";
import VerifyOrder from "./Pages/VerifyOrder/VerifyOrder";
import Procurement from "./Pages/Procurement/Procurement";
import EmergencyRation from "./Pages/EmergencyRation/EmergencyRation";
import RationMart from "./Pages/RationMart/RationMart";
import TollFree from "./Pages/TollFree/TollFree";
import Requisition from "./Pages/Requisition/Requisition";

const App = () => {
  const [showLogin, setShowLogIn] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogIn={setShowLogIn} /> : <></>}
      <div className="app">
        <Navbar setShowLogIn={setShowLogIn} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/TollFree" element={<TollFree/>}></Route>
          <Route path="/Download" element={<Download />}></Route>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
          <Route path="/Requisition" element={<Requisition/>}></Route>
          <Route path="/order" element={<PlaceOrder/>}></Route>
          <Route path="/MonthlyDistributions" element={<MonthlyDistributions/>}></Route>
          <Route path="/UserDetails" element={<UserDetails/>}></Route>
          <Route path="/NearestRationShops" element={<NearestRationShops/>}></Route>
          <Route path="/DealersList" element={<DealersList/>}></Route>
          <Route path="/MyOrders" element={<MyOrders/>}></Route>
          <Route path="/verifyOrders" element={<VerifyOrder/>}></Route>
          <Route path="/Procurement" element={<Procurement/>}></Route>
          <Route path="/emergencyRation" element={<EmergencyRation/>}></Route>
          <Route path="/rationMart" element={<RationMart/>}></Route>
        </Routes>
      </div>
      <ChatBot />
      <Footer />
    </>
  );
};

export default App;
