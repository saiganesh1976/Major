import React from "react";
import "./Sidebar.css";
import add_icon from "../../assets/admin_assets/add_icon.png";
import order_icon from "../../assets/admin_assets/order_icon.png";
import { NavLink } from "react-router-dom";
import { PiNotepadDuotone } from "react-icons/pi";
import { FaCheckToSlot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDomainAdd } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { TbShoppingCartPlus } from "react-icons/tb";
import { TbShoppingBagEdit } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="Admin-Sidebar">
      <div className="sidebar-options">
        <NavLink to="/main" className="sidebar-option">
          <PiNotepadDuotone size={35} />
          <p>Main</p>
        </NavLink>
        <NavLink to="/addSlots" className="sidebar-option">
          <SlCalender size={30} />
          <p>Add Slots</p>
        </NavLink>
        <NavLink to="/slotBookings" className="sidebar-option">
          <FaCheckToSlot size={30} />
          <p>Slot Bookings</p>
        </NavLink>
        <NavLink to="/addRation" className="sidebar-option">
          <IoPersonAddSharp size={30} />
          <p>Add Ration Holder</p>
        </NavLink>
        <NavLink to="/listRation" className="sidebar-option">
          <FaRegAddressCard size={30} />
          <p>List Ration Holders</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <TbShoppingCartPlus size={30} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <TbShoppingBagEdit size={30} />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <FiShoppingBag size={30} />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/addDealers" className="sidebar-option">
          <MdOutlineDomainAdd size={30} />
          <p>Add Dealers</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
