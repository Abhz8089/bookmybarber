import { useState } from "react";
import { BrowserRouter,NavLink,Route } from "react-router-dom";

import Hamburger from "../subComponents/Humberger";


import "./userStyles/Navbar.css"

const Navbars = () => {
   const [showNavbar, setShowNavbar] = useState(false)
   const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
   }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h1>
            book <span className="m">M</span>y barber
          </h1>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">HOME</NavLink>
            </li>
            <li>
              <span className="line">||</span>
            </li>
            <li>
              <NavLink to="/projects">STYLES</NavLink>
            </li>
            <li>
              <NavLink to="/about">
                <span className="specialLink">YOUR&nbsp;BOOKINGS</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbars