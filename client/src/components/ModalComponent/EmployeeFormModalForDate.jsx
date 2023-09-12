import React, { useState } from "react";
import Modal from "react-modal";
import Styles from "./Styles/EmployeeFormForDate.module.css";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const EmployeeFormModalForDate = ({
  isOpen,
  onRequestClose,
  empId,
  onDateUpdate,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const details = {
        selectDate: selectedDate,
        empId: empId,
      };

      const { data } = await axios.post("/s/sEditDate", {
        details,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        onDateUpdate(data);
        onRequestClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
   const today = new Date().toISOString().split("T")[0];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={Styles.modal}
      overlayClassName={Styles.overlay}
    >
      <h2>Edit Date</h2>
      <div className={Styles.form_group}>
        <label className={Styles.label}>Date</label>
  
        <input type="date" className={Styles.selector} value={selectedDate} min={today} onChange={(e)=>handleDateChange(e.target.value)}  />
      </div>
      <div className={Styles.button_container}>
        <button className={Styles.button} onClick={handleSubmit}>
          Submit
        </button>
       
      </div>
      <FaTimes onClick={onRequestClose}></FaTimes>
    </Modal>
  );
};

export default EmployeeFormModalForDate;
