import React, { useEffect } from "react";
import Modal from "react-modal";
import  Style from  "../ModalComponent/Styles/NotificationModal.module.css"; 
import { useSelector } from "react-redux";
import axios from "axios";

const NotificationModal = ({ isOpen, onRequestClose }) => {

    const user = useSelector((state)=>state.client.user);
 

    useEffect(() => {
     async function  getNotification (){
        const id = user.id;
        try {
            const {data} = await axios.get('/getNotification',{
                params:{
                    userId:id
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
     }
    //  getNotification()
    
  
    }, [])
    



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification Modal"
      className={Style.notification_modal}
      overlayClassName={Style.notification_modal_overlay}
    >
     
      <p className={Style.bordered}>This is a notification message.</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default NotificationModal;
