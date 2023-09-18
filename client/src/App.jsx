import { Routes,Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster ,toast} from "react-hot-toast";


import Home from "./pages/Client/Home";
import Style from './pages/CommonPages/Style'
import About from "./pages/CommonPages/About";


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

import Map from "./pages/Client/Map";

import SLogin from './pages/Shop/ShopLogin';
import SRegister from './pages/Shop/ShopRegister';
import SOtp from './pages/Shop/ShopOtp';
import UpdateFOTP from './pages/Shop/OTPupdatePassword'
import ChangedPassword from './pages/Shop/ChangePassword'
import Bookings from './pages/Shop/Bookings'
import ScheduleDetails from "./pages/Shop/ScheduleDetails";
import Profile from "./pages/Shop/Profile";
import StyleImg from "./pages/Shop/ShowStyleImg"
import ShowShopImg from "./pages/Shop/ShowShopImages";

import AdminLogin from "./pages/Admin/Login";
import BeauticianD from "./pages/Admin/BeauticianD";
import Client from './pages/Admin/Client'

import ErrorPage from "./pages/Error/ErrorPage";

import UserPrivate from './Private/UserPrivateRoute';
import ShopPrivate from "./Private/ShopPrivateRoute";

import './App.css'



axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;


function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 4000 }}
      ></Toaster>

      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientOTP" element={<Otpclient />} />
        <Route path="/chPOtp" element={<ChPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/style" element={<Style />} />
        <Route path="/about" element={<About />} />

        <Route path="/s/sLogin" element={<SLogin />} />
        <Route path="/s/sRegister" element={<SRegister />} />
        <Route path="/s/sOtp" element={<SOtp />} />
        <Route path="/s/sChOTP" element={<UpdateFOTP />} />
        <Route path="/s/sChangePassword" element={<ChangedPassword />} />

        <Route path="/ad/admin" element={<AdminLogin />} />
        <Route path="/ad/beautician" element={<BeauticianD />} />
        <Route path="/ad/clients" element={<Client />} />

        <Route path="" element={<ShopPrivate />}>
          <Route path="/s/sGetShopImg" element={<ShowShopImg />} />
          <Route path="/s/sStyleImg" element={<StyleImg />} />
          <Route path="/s/sProfile" element={<Profile />} />{" "}
          <Route path="/s/sSchedule" element={<ScheduleDetails />} />{" "}
          <Route path="/s/sBookings" element={<Bookings />} />{" "}
        </Route>
        <Route path="" element={<UserPrivate />}>
          <Route path="/details" element={<Details />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/shopList" element={<ShopList />} />
          <Route path="/search" element={<FirstPage />} />
        </Route>


      </Routes>
    </>
  );
}

export default App
