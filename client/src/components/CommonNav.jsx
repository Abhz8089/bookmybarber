import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route,useNavigate } from "react-router-dom";
import {  toast} from "react-hot-toast";

import Hamburger from "../components/subComponents/Humberger";

import "./CommonNav.css";
import axios from "axios";

const Navbars = ({ scrolling }) => {
  const Navigate = useNavigate()
  const [user, setUser] = useState([]);
  const [shop,setShop]=useState([]);
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
       
       const shopDataString= localStorage.getItem('shopData')

      const userDataString = localStorage.getItem("userData");

      if (userDataString) {
        const userDataObject = JSON.parse(userDataString);
        setUser(userDataObject);
      } else {
        setUser(null);
      }
      if(shopDataString){
        const shopDataObject = JSON.parse(shopDataString)
        setShop(shopDataObject)
      }else{
        setShop(null)
      }
   
  }, [])

  const LogOUT=async()=>{
    
    const {data} = await axios.post('/logout')
    if(data.success){
      localStorage.removeItem("userData");
      setUser(null)
      Navigate('/')
      toast.success(data.success)


    }
  }

  const LogOUTshop =async()=>{
    const {data} = await axios.post('/s/sLogout')
    if (data.success) {
      localStorage.removeItem("shopData");
      setShop(null);
      Navigate("/");
      toast.success(data.success);
    }
  }
  

  return (
    // className="navbar"
    <nav className={`navbars ${scrolling ? "scrolling" : ""}`}>
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
            {/* <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li> */}
            {user ? (
              <li className="liii" onClick={LogOUT}>
                LOGOUT
              </li>
            ) : shop ? (
              <li className="liii" onClick={LogOUTshop}>
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
