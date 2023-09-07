import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Hamburger from "../components/subComponents/Humberger";

import "./CommonNav.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logoutClient, logoutShop } from "../globelContext/clientSlice";
import {
  jsonParseShopDataString,
  jsonParseUserDataString,
} from "../../helpers/JSONparse.js";

const Navbars = ({ scrolling }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [shop, setShop] = useState([]);
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    let user = jsonParseUserDataString();
    let shop = jsonParseShopDataString();

    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    if (shop) {
      setShop(shop);
    } else {
      setShop(null);
    }
  }, []);

  // useEffect(() => {

  //   dispatch(fetchUserData())
  //     .unwrap()
  //     .catch((error) => {

  //       Navigate("/login");
  //     });
  // }, []);

  const LogOUT = async () => {
    const { data } = await axios.post("/logout");
    if (data.success) {
      dispatch(logoutClient());
      setUser(null);
      Navigate("/");
      toast.success(data.success);
    }
  };

  const LogOUTshop = async () => {
    const { data } = await axios.post("/s/sLogout");
    if (data.success) {
      dispatch(logoutShop());
      setShop(null);
      Navigate("/");
      toast.success(data.success);
    }
  };

  return (
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
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <span className="line">||</span>
            </li>
            <li>
              <NavLink to="/style">STYLES</NavLink>
            </li>
            <li>
              <NavLink to="/bookings">
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
