import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import img1 from "../../../public/contentImages/image1.jpg";
import img2 from "../../../public/contentImages/image2.jpg";
import img3 from "../../../public/contentImages/image3.jpg";
import img4 from "../../../public/contentImages/image5.png";

import userIcon from "../../../public/contentImages/userIcon.gif";

import Navbar from "../../components/users/Navbar";
import Footer from "../../components/Footer";
import { employeeList as saveEmploye } from "../../globelContext/clientSlice";

import Style from "../ClientStyles/FilterPage.module.css";

import { useSelector, useDispatch } from "react-redux";
import { shop } from "../../globelContext/clientSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FilterPage = () => {
  const Navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [active, setActive] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [shop, setShop] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [finalEmployee, setFinalEmployee] = useState([]);
  const [finalServices, setFinalServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [img,setImg] = useState([])

  const employeeList = useSelector((state) => state.client.employeeList);
  const oneShop = useSelector((state) => state.client.shopDetails);

  useEffect(() => {
    async function getImage() {
      try {
        const { data } = await axios.get(`/s/sGetImg/${oneShop[0]._id}`);
        console.log(data)
        console.log('-------------------------data of images-----------------------')
        setImg(data)
        

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
    getImage();
    if (employeeList) {
      setEmployee(employeeList);
    }
    if (oneShop) {
      setShop(oneShop);
      console.log(oneShop);
    }
  }, [employeeList, oneShop]);

  useEffect(() => {
    if (employee.length > 0) {
      const uniqueServices = [
        ...new Set(employee.map((item) => item.service).flat()),
      ];
      const serviceOptions = uniqueServices.map((service) => ({
        value: service,
        label: service,
      }));

      const uniqueEmployees = [
        ...new Set(employee.map((item) => item.employeeName).flat()),
      ];
      const allEmployee = {
        value: "allBarber",
        label: "Select All",
      };
      const employeeOptions = uniqueEmployees.map((employees) => ({
        value: employees,
        label: employees,
      }));
      const finalEmployeeOptions = [allEmployee, ...employeeOptions];

      setEmployeeOptions(finalEmployeeOptions);
      setServiceOptions(serviceOptions);
    } else {
      setEmployeeOptions([]);
      setServiceOptions([]);
    }
  }, [employee, selectedDate]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const dateToMatch = new Date(date);

    const matchingObjects = employeeList.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.getTime() === dateToMatch.getTime();
    });

    if (matchingObjects.length) {
      setEmployee(matchingObjects);
    } else {
      setEmployee([]);
    }
  };

  const submitFilterdData = async () => {
    try {
      console.log(finalEmployee);
      console.log(selectedDate);

      const valuesArray = finalServices.map((option) => option.value);

      const { data } = await axios.post("/s/getSlot", {
        Employee: finalEmployee.value,
        selectedDate,
        services: valuesArray,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        console.log(data.details);
        setSlots(data.details);

        if (data.details.length == 0) {
          toast("", {
            icon: "😑Slots unavailable select another options...",
          });
        } else {
          setActive(true);
          toast("", {
            icon: "⏬Scroll Down⏬",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const bookNow = async (time, id) => {
    try {
      const valuesArray = finalServices.map((option) => option.value);
      const { data } = await axios.post("/booked", {
        time,
        id,
        Employee: finalEmployee.value,
        selectedDate,
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
  const currentDate = new Date();
  return (
    <>
      <Navbar />

      <div className={Style.container}>
        <DatePicker
          className={Style.selectMulti}
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={currentDate}
          placeholderText="Select a date"
          showIcon={true}
        />
        <Select
          className={Style.selectMulti}
          closeMenuOnSelect={false}
          placeholder="Select Services..."
          components={animatedComponents}
          // defaultValue={[options[4], options[5]]}
          value={finalServices}
          onChange={(selectedOptions) => {
            setFinalServices(selectedOptions);
          }}
          isMulti
          options={serviceOptions}
        />

        <Select
          className={Style.select}
          options={employeeOptions}
          placeholder="Select Barber...."
          value={finalEmployee}
          onChange={(selectedOptions) => {
            setFinalEmployee(selectedOptions);
          }}
        />

        <button className={Style.button} onClick={submitFilterdData}>
          Submit
        </button>

        <div className={Style.pic_ctn}>
          {shop.length ? (
            <h1 className={Style.heading}>{shop[0].businessName}</h1>
          ) : (
            <></>
          )}
        
          {img.length ? (
            <>
              {img.map((imageName, index) => (
                <img
                  key={index} // Make sure to set a unique key for each image
                  src={`../../../uploads/${imageName}`}
                  alt=""
                  className={Style.pic}
                />
              ))}
            </>
          ) : (
            <></>
          )}

         
        </div>
      </div>
      {active ? (
        <>
          <div className={Style.hello}>
            <div className={Style.contentContainer}>
              {slots.map((data, key) => (
                <div className={Style.contentRow} key={key}>
                  <div className={Style.iconBody}>
                    <img src={userIcon} alt="" />
                    <i>{data.employeeName}</i>
                  </div>
                  {data.Time.map((timeSlot, index) => (
                    <button
                      onClick={() => bookNow(timeSlot.time, data._id)}
                      key={index}
                      style={{
                        color: "white",
                        background: "black",
                        borderRadius: "4px",
                      }}
                    >
                      <span>{timeSlot.time}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};

export default FilterPage;
