import { useState } from "react";
import { BrowserRouter, NavLink, Route, useNavigate } from "react-router-dom";

import Hamburger from "../subComponents/Humberger";
import { useAdminData } from "../../contexts/userContexts";
import {useDispatch} from 'react-redux'
import { logoutUser } from "../../globelContext/userSlice";

import "./styles/Navbar.css"
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbars = () => {
   const dispatch = useDispatch()
  const Navigate = useNavigate()
   const { adminData, setAdminData } = useAdminData();
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const adminLogout= async() => {
   
    try {
      await axios.post('/ad/adminLogout')
      dispatch(logoutUser())
      setAdminData({})
      Navigate('/ad/admin')
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <nav className="navbar" style={{ background: "#353743" }}>
      <div className="container">
        <div className="logo">
          <div>
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
              {adminData ? (
                <li  onClick={adminLogout}   style={{color:'white',cursor:'pointer'}}>
                  {/* <NavLink to="/logout">LOGOUT</NavLink> */}
                  LOGOUT
                </li>
              ) : (
                <li>
                  {/* <NavLink to="/login">LOGIN</NavLink> */}
                  LOGIN
                </li>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbars;
