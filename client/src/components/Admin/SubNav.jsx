



import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles/subNav.css";

const SubNav = () => {
  const location = useLocation();

  return (
    <div className="className">
      <div className="className1">
        <NavLink
          to="/ad/Beautician"
          activeClassName="active"
          className={location.pathname === "/Beautician" ? "active" : ""}
        >
          BEAUTICIANS
        </NavLink>
        <NavLink
          to="/ad/clients"
          activeClassName="active"
          className={location.pathname === "/ad/clients" ? "active" : ""}
        >
          CLIENTS
        </NavLink>
        {/* <NavLink
          to="/ad/styles"
          activeClassName="active"
          className={location.pathname === "/ad/styles" ? "active" : ""}
        >
          STYLES
        </NavLink> */}
      </div>
    </div>
  );
};

export default SubNav;
