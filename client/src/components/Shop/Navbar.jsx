import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, useNavigate } from "react-router-dom";
import {
  jsonParseShopDataString,

} from "../../../helpers/JSONparse.js";


import Hamburger from "../subComponents/Humberger";

import "../users/userStyles/Navbar.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {  logoutShop } from "../../globelContext/clientSlice.js"; 

const Navbars = () => {
  const dispatch =useDispatch()
  const Navigate = useNavigate()
  const [showNavbar, setShowNavbar] = useState(false);
  const [shop, setShop] = useState('')
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
   const Client = useSelector((state) => state.client.shop);
  useEffect(() => {
    //  let shop = jsonParseShopDataString();
    //  if(shop){
    //   setShop(shop)
    //  }else{
    //   setShop('')
    //  }
    if(Client){
      setShop(Client)
    }else{
      setShop(null)
    }
  }, [])
  
   const LogOut = async () => {
     const { data } = await axios.post("/s/sLogout");
     if (data.success) {
       // localStorage.removeItem("shopData");
       dispatch(logoutShop());
       setShop(null);
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
              <NavLink to="/about">
                <span className="specialLink">YOUR&nbsp;BOOKINGS</span>
              </NavLink>
            </li>
            { shop ? (
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
};

export default Navbars;
