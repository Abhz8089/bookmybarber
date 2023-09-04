import { Routes,Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster ,toast} from "react-hot-toast";


import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import Register from "./pages/Client/Register";
import Otpclient from "./pages/Client/Otp";
import ChPassword from './pages/Client/ChangePOTP';
import ChangePassword from './pages/Client/ChangePassword';
import FirstPage from './pages/Client/FirstPage_shopSearch';
import ShopList  from "./pages/Client/ShopList";
import FilterPage from "./pages/Client/FilterPage";
import SuccessPage from "./pages/Client/successPage";
import Details from "./pages/Client/Details";

import SLogin from './pages/Shop/ShopLogin';
import SRegister from './pages/Shop/ShopRegister';
import SOtp from './pages/Shop/ShopOtp';
import UpdateFOTP from './pages/Shop/OTPupdatePassword'
import ChangedPassword from './pages/Shop/ChangePassword'
import Bookings from './pages/Shop/Bookings'
import ScheduleDetails from "./pages/Shop/ScheduleDetails";
import Profile from "./pages/Shop/Profile";

import AdminLogin from "./pages/Admin/Login";
import BeauticianD from "./pages/Admin/BeauticianD";
import Client from './pages/Admin/Client'

import ErrorPage from "./pages/Error/ErrorPage";

import './App.css'
import { useSelector } from "react-redux";
import shop from "../../server/Models/shopModel";
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;


function App() {
  const user = useSelector((state) => state.client.shop); // Access user data from Redux store
  const client = useSelector((state) => state.client.user); // Access user data from Redux store
  
  console.log(user)
  console.log('shop')
  console.log(client)
  console.log('user')
  

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 4000 }}
      ></Toaster>

      <Routes>

        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientOTP" element={<Otpclient />} />
        <Route path="/chPOtp" element={<ChPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/" element={<Home />} />
       

        <Route path="/s/sLogin" element={<SLogin />} />
        <Route path="/s/sRegister" element={<SRegister />} />
        <Route path="/s/sOtp" element={<SOtp />} />
        <Route path="/s/sChOTP" element={<UpdateFOTP />} />
        <Route path="/s/sChangePassword" element={<ChangedPassword />} />
        

        <Route path="/ad/admin" element={<AdminLogin />} />
        <Route path="/ad/beautician" element={<BeauticianD />} />
        <Route path="/ad/clients" element={<Client />} />

      

        {user ? (
          <Route path="/s/sBookings" element={<Bookings />} />
        ) : (
          <Route path="/s/sBookings" element={<ErrorPage />} />
        )}
        {user ? (
          <Route path="/s/sSchedule" element={<ScheduleDetails />} />
        ) : (
          <Route path="/s/sSchedule" element={<ErrorPage />} />
        )}
        {user ? (
          <Route path="/s/sProfile" element={<Profile />} />
        ) : (
          <Route path="/s/sProfile" element={<ErrorPage />} />
        )}

        {/* Protect routes for clients */}
        {client ? (
          <Route path="/search" element={<FirstPage />} />
        ) : (
          <Route path="/search" element={<ErrorPage />} />
        )}
        {client ? (
          <Route path="/shopList" element={<ShopList />} />
        ) : (
          <Route path="/shopList" element={<ErrorPage />} />
        )}
        {client ? (
          <Route path="/filter" element={<FilterPage />} />
        ) : (
          <Route path="/filter" element={<ErrorPage />} />
        )}
        {client ? (
          <Route path="/success" element={<SuccessPage />} />
        ) : (
          <Route path="/success" element={<SuccessPage />} />
        )}
        {client ? (
          <Route path="/details" element={<Details />} />
        ) : (
          <Route path="/details" element={<Details />} />
        )}
      </Routes>
    </>
  );
}

export default App
