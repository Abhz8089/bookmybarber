import { useEffect, useState } from "react";
import { BrowserRouter,NavLink,Route, useNavigate } from "react-router-dom";

import Hamburger from "../subComponents/Humberger";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { logoutClient } from "../../globelContext/clientSlice.js"; 

import { jsonParseUserDataString } from "../../../helpers/JSONparse.js";

import "./userStyles/Navbar.css"

const Navbars = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [user, setUser] = useState("");

  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const client = useSelector((state) => state.client.user); // Access user data from Redux store

  useEffect(() => {
    // let user = jsonParseUserDataString();
    // console.log(user);
    // if (user) {
    //   setUser(user);
    // } else {
    //   setUser("");
    // }

          // const ifUser = async () => {
          //   try {
          //     const { data } = await axios.get("/ifUser");
          //     if (data.error) {
          //       dispatch(logoutClient());
                
          //     }
          //   } catch (error) {
          //     dispatch(logoutClient());
          //     toast.error("Server please re login");
          //   }
          // };
          // ifUser();



    if(client){
      setUser(client)
    }else{
      setUser(null)
    }
  }, []);

  const LogOut = async () => {
    const { data } = await axios.post("/s/sLogout");
    if (data.success) {
      // localStorage.removeItem("shopData");
      dispatch(logoutClient());
      setUser(null);
      Navigate("/");
      toast.success(data.success);
    }
  };

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
              <NavLink to="/about">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <span className="line">||</span>
            </li>
            <li>
              <NavLink to="/projects">STYLES</NavLink>
            </li>
            <li>
              <NavLink to="/details">
                <span className="specialLink">YOUR&nbsp;BOOKINGS</span>
              </NavLink>
            </li>
            {user ? (
              <li className="liii" onClick={LogOut}>
                LOGOUT
              </li>
            ) : (
              <li>
                <NavLink to="/login">LOGIN</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbars