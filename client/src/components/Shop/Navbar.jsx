import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, useNavigate } from "react-router-dom";
import {
  jsonParseShopDataString,

} from "../../../helpers/JSONparse.js";

import icon from '../../../public/contentImages/animatedicon.gif'
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
              <NavLink to="/style">STYLES</NavLink>
            </li>
            <li>
              <NavLink to="/s/sBookings">
                <span className="specialLink">YOUR&nbsp;BOOKINGS</span>
              </NavLink>
            </li>
            {shop ? (
              <>
                <li>
                  <NavLink to='/map'>
                    {" "}
                    <img src={icon} className="custom-icon" alt="" />{" "}
                  </NavLink>
                </li>
                <li className="liii" onClick={LogOut}>
                  LOGOUT
                </li>
              </>
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





  //  let shop = jsonParseShopDataString();
    //  if(shop){
    //   setShop(shop)
    //  }else{
    //   setShop('')
    //  }
        // const ifShop = async () => {
        //   try {
        //     const { data } = await axios.get("/s/sIfShop");
        //     if (data.error) {
        //       dispatch(logoutShop());
        //     }
        //   } catch (error) {
        //     dispatch(logoutShop());
        //     toast.error("Server please re login");
        //   }
        // };
        // ifShop();
