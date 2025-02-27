import React from "react";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Orders from "./Pages/Orders/Orders";
import List from "./Pages/List/List";
import Add from "./Pages/Add/Add";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddRationCard from "./Pages/AddRationCard/AddRationCard";
import ListRationHolders from "./Pages/ListRationHolders/ListRationHolders";
import AddDealers from "./Pages/AddDealers/AddDealers";
import SlotBookings from "./Pages/SlotBookings/SlotBookings";
import AddSlots from "./Pages/AddSlots/AddSlots";
import Main from "./Pages/Main/Main";
// import ListDealers from "./Pages/ListDealers/ListDealers";

const App = () => {
  const url = "https://major-backend-5gti.onrender.com";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/addRation" element={<AddRationCard url={url} />} />
          <Route path="/listRation" element={<ListRationHolders url={url} />} />
          <Route path="/addDealers" element={<AddDealers url={url} />} />
          <Route path="/addSlots" element={<AddSlots url={url} />} />
          <Route path="/slotBookings" element={<SlotBookings url={url} />} />
          <Route path="/main" element={<Main url={url} />} />
          {/* <Route path="/listDealers" element={<ListDealers url={url} />} /> */}
        </Routes>
        {/* <Main /> */}
      </div>
    </div>
  );
};

export default App;
