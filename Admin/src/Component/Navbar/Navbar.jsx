import React from 'react'
import './Navbar.css'
import admin_logo from "../../assets/admin_assets/logo.png"
import admin_profile from "../../assets/admin_assets/profile_image.png"
import ration_icon from "../../assets/admin_assets/ration_icon.png"
const Navbar = () => {
  return (
    <div className='Admin-Navbar'>
      <div className="Navbar-title">
        <img src={ration_icon} alt="Company-logo" className="Navbar-logo" />
        <div className="Navbar-title-subsection">
          <p className="Navbar-main-title">Smart Ration Vitran Aur Niyantran</p>
          <p className="Navbar-subtitle">Department of Food & Public Distribution</p>
        </div>
      </div>
      {/* <img className='logo' src={admin_logo} alt="" /> */}
      <p className='navbar-admin-title'>ADMIN PANEL</p>
      <img className='profile' src={admin_profile} alt="" />
    </div>
  )
}

export default Navbar
