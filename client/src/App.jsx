import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Toaster ,toast} from "react-hot-toast";



// import Navbar from "./components/users/Navbar";
// import Footer from "./components/footer";

import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import Register from "./pages/Client/Register";
import Otpclient from "./pages/Client/Otp";
import ChPassword from './pages/Client/ChangePOTP'
import ChangePassword from './pages/Client/ChangePassword'

import SLogin from './pages/Shop/ShopLogin';
import SRegister from './pages/Shop/ShopRegister';
import SOtp from './pages/Shop/ShopOtp';
import UpdateFOTP from './pages/Shop/OTPupdatePassword'
import ChangedPassword from './pages/Shop/ChangePassword'

import AdminLogin from "./pages/Admin/Login";
import BeauticianD from "./pages/Admin/BeauticianD";
import Client from './pages/Admin/Client'

import './App.css'
axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;


function App() {
 

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 4000 }}
      ></Toaster>

      <Routes>
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
      </Routes>
    </>
  );
}

export default App
