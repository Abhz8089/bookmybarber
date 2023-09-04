import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import './styles/SubNavShop.css'

const SubNav = () => {
  const location = useLocation();

  return (
    <div className="sclassName">
      <div className="sclassName1">
        <NavLink
          to="/s/sSchedule"
          activeClassName="active"
          className={location.pathname === "/s/sSchedule" ? "active" : ""}
        >
          BOOKINGS
        </NavLink>
        <NavLink
          to="/s/sBookings"
          activeClassName="active"
          className={location.pathname === "/s/sBookings" ? "active" : ""}
        >
          SCHEDULES
        </NavLink>
        <NavLink
          to="/s/sProfile"
          activeClassName="active"
          className={location.pathname === "/s/sProfile" ? "active" : ""}
        >
          PROFILE
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
