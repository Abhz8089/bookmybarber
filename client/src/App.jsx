import { Routes,Route } from "react-router-dom";
import axios from "axios";
import { Toaster ,toast} from "react-hot-toast";

import Navbar from "./components/users/Navbar";
import Footer from "./components/footer";

import Home from "./pages/Client/Home";
import Login from "./pages/Client/Login";
import Register from "./pages/Client/Register";
import Otpclient from "./pages/Client/Otp"

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
      </Routes>
    </>
  );
}

export default App
