


// import React, { useState } from "react";
// import "./styles/subNav.css";

// const SubNav = () => {
//   const [selectedTab, setSelectedTab] = useState(null);

//   const handleTabClick = (index) => {
//     setSelectedTab(index);
//   };

//   return (
//     <div className="className">
//       <div className="className1">
//         <p
//           className={selectedTab === 0 ? "active" : ""}
//           onClick={() => handleTabClick(0)}
//         >
//           DASHBOARD
//         </p>
//         <p
//           className={selectedTab === 1 ? "active" : ""}
//           onClick={() => handleTabClick(1)}
//         >
//           BEAUTICIANS
//         </p>
//         <p
//           className={selectedTab === 2 ? "active" : ""}
//           onClick={() => handleTabClick(2)}
//         >
//           CLIENTS
//         </p>
//         <p
//           className={selectedTab === 3 ? "active" : ""}
//           onClick={() => handleTabClick(3)}
//         >
//           STYLES
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SubNav;



import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles/subNav.css";

const SubNav = () => {
  const location = useLocation();

  return (
    <div className="className">
      <div className="className1">
        <NavLink
          to="/ad/dashboard"
          activeClassName="active"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          DASHBOARD
        </NavLink>
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
        <NavLink
          to="/ad/styles"
          activeClassName="active"
          className={location.pathname === "/ad/styles" ? "active" : ""}
        >
          STYLES
        </NavLink>
      </div>
    </div>
  );
};

export default SubNav;
