import Modal from 'react-modal'
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";


import Styles from './Styles/Captcha.module.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CaptchaModal = ({ isOpen, onRequestClose, isSlot, id,services ,employee,date}) => {
  const Navigate = useNavigate()
  const [button, setButton] = useState(true);

   
 
 
  const onChange = (value) => {
    console.log("Captcha value:", value);
    setButton(false);
  };

  const bookNow = async (time, id,dates) => {
    
    try {
      const valuesArray = services.map((option) => option.value);
      const { data } = await axios.post("/booked", {
        time,
        id,
        Employee: employee.value,
        date:dates,
        services: valuesArray,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        Navigate("/success");
        toast.success("Slot booking success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={Styles.modal}
      overlayClassName={Styles.overlay}
    >
      <ReCAPTCHA
        sitekey="6Lc31fsnAAAAAE2qA1a8p48Rg7Pr5gy81q_nZ3lu"
        onChange={onChange}
      />
      <button className={Styles.button} hidden={button} onClick={()=>bookNow(isSlot,id,date)} >
        Submit
      </button>
    </Modal>
  );
};

export default CaptchaModal