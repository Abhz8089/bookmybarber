import { useState } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";

import Hamburger from "../subComponents/Humberger";

import "./styles/Navbar.css"

const Navbars = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar" style={{ background: "#353743" }}>
      <div className="container">
        <div className="logo">
          <div >
            <h1>
              book <span className="m">M</span>y barber
            </h1>
          </div>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbars;
