import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import userIcon from "../../../public/contentImages/userIcon.gif";
import Style from "../ClientStyles/FilterPage.module.css";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/Footer";
import { logoutClient, employeeList as saveEmploye,clearEmployee,shopList } from "../../globelContext/clientSlice";
import { shop } from "../../globelContext/clientSlice";
import CaptchaModal from "../../components/ModalComponent/CaptchaModal";



import Chat from '../../components/Chat/supportEngine/supportEngine';
import iconForLocation from '../../../public/contentImages/map.gif' 



const FilterPage = () => {
  const Navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [active, setActive] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [shop, setShop] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [finalEmployee, setFinalEmployee] = useState([]);
  const [finalServices, setFinalServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [img,setImg] = useState([]);
  const [isCaptchaOpen,setIsCaptchaOpen] = useState(false);
  const [timSlot,setTimeSlot]= useState('')
  const [idfor,setId] = useState('')
  const resultsRef = useRef(null);
   

 



  const employeeList = useSelector((state) => state.client.employeeList);
  const oneShop = useSelector((state) => state.client.shopDetails);

  const setDataForCaptcha=(slot,id)=>{
    setTimeSlot(slot)
    setId(id)
     setIsCaptchaOpen(true);
  }


  useEffect(() => {
    const ifUser = async () => {
      try {
        const { data } = await axios.get("/ifUser");
        if (data.error) {
          dispatch(logoutClient());

        }
      } catch (error) {
        dispatch(logoutClient());
        toast.error("Server please re login");
      }
    };
    ifUser();

    async function getImage() {
  
     
      try {
        const { data } = await axios.get(`/s/sGetImgs/${oneShop[0]._id}`);
      
        setImg(data);
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
    const dateTo = dateToMatch.toISOString()
    const finalDate= new Date(dateTo);
 const matchingObjects =  employeeList.filter((item) => {
   const itemDate = new Date(item.date);
   return finalDate <= itemDate; 
 });
    


    if (matchingObjects.length) {
      setEmployee(matchingObjects);
    } else {
      setEmployee([]);
    }
  };

   const scrollToResults = () => {
     // Scroll to the results section when called
     resultsRef.current.scrollIntoView({ behavior: "smooth" });
   };

  const submitFilterdData = async () => {
    try {
         
         let shopIDs; 

         if (shop.length > 0) {
           let { _id: id } = shop[0];
           shopIDs = id; 
         }
      const valuesArray = finalServices.map((option) => option.value);
       
      const { data } = await axios.post("/s/getSlot", {
        Employee: finalEmployee.value,
        selectedDate,
        services: valuesArray,
        shopId:shopIDs,
        
      });
  
      if (data.error) {
        toast.error(data.error);
        setSlots([])
      } else {
      
        setSlots(data);
        
        if (data.length == 0) {
          toast("", {
            icon: "😑Slots unavailable select another options...",
          });
        } else {
          setActive(true);

          toast("", {
            icon: "⏬Scroll Down⏬",
          });
           scrollToResults(); 
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

   const today = new Date().toISOString().split("T")[0];


   const goToLocation = async() =>{

      if(shop[0].location){
        dispatch(shopList(shop[0].location))
        Navigate('/map')
      }else{
        toast.error(
          `We're sorry, but ${shop[0].businessName} has not provided their location yet. Please check back later or contact the shop for more information.`
        );
      }
   }


  const closeModal =()=> {
    setIsCaptchaOpen(false)
  }
  return (
    <>
      <Navbar />
      <div className={Style.container}>
        <input
          type="date"
          className={Style.selector}
          min={today}
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
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
            <div className={Style.h1}>
              <h1 className={Style.heading}>{shop[0].businessName}</h1>
              <pre>
                <i className={Style.heading1}>
                  <b>Mobile</b> : {shop[0].phoneNumber}
                </i>
              </pre>
              <pre>
                <i className={Style.heading1}>
                  <b>Address</b> : {shop[0].address}
                </i>
              </pre>

              <img
                src={iconForLocation}
                onClick={() => goToLocation()}
                alt=""
              />
            </div>
          ) : (
            <></>
          )}

          {img.length ? (
            <>
              {img.map((imageName, index) => (
                <img
                  key={index}
                  src={`http://www.dabj.online/uploads/${imageName}`}
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
      <div ref={resultsRef} />
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
                      onClick={() => setDataForCaptcha(timeSlot, data._id)}
                      key={index}
                      style={{
                        color: "white",
                        background: "black",
                        borderRadius: "4px",
                      }}
                    >
                      <span>{timeSlot}</span>
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
      <Chat />
      <Footer />
      <CaptchaModal
        isOpen={isCaptchaOpen}
        onRequestClose={closeModal}
        isSlot={timSlot}
        id={idfor}
        services={finalServices}
        employee={finalEmployee}
        date={selectedDate}
      />
    </>
  );
};

export default FilterPage;
