import { useEffect, useState } from "react";
import { BrowserRouter,NavLink,Route, useNavigate } from "react-router-dom";

import Hamburger from "../subComponents/Humberger";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { logoutClient } from "../../globelContext/clientSlice.js"; 

import { jsonParseUserDataString } from "../../../helpers/JSONparse.js";
import notification from "../../../public/contentImages/notification.png";
import NotificationModal from "../ModalComponent/NotificationModal";

import "./userStyles/Navbar.css"

const Navbars = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
const users = useSelector((state) => state.client.user); 
const count = useSelector((state) => state.client.notificationCount); 
  const [user, setUser] = useState("");
  const [openModal, setOpenModal] = useState(false);

    const handleShowModal = () => {
     if (users) {
       setOpenModal(true);
     }
     
    };

    const handleCloseModal = () => {
      setOpenModal(false);
    };

  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const client = useSelector((state) => state.client.user); 

  useEffect(() => {
    if(client){
      setUser(client)
    }else{
      setUser(null)
    }
  }, []);

  const LogOut = async () => {
  
    const { data } = await axios.post("/logout");
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
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                {count ? <>    <div
                  style={{
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px", 
                  }}
                >
                  <span style={{ color: "white", fontSize: "10px" }}>{count}</span>
                </div></>:
                <>
                </>
                }
            
                <img
                  style={{ width: "18px" }}
                  onClick={handleShowModal}
                  src={notification}
                  alt=""
                />
              </div>
              <NotificationModal
                isOpen={openModal}
                onRequestClose={handleCloseModal}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbars