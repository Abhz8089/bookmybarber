import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import  Style from  "../ModalComponent/Styles/NotificationModal.module.css"; 
import { useSelector,useDispatch } from "react-redux";
import {Notification} from '../../globelContext/clientSlice'
import axios from "axios";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ isOpen, onRequestClose }) => {

    const user = useSelector((state)=>state.client.user);
    const dispatch = useDispatch()
    const [noti, setNoti] = useState([]) ;
    const Navigate = useNavigate()

   
    useEffect(() => {
     let id
       
     async function  getNotification (){
       
        try {
            const {data} = await axios.get('/getNotification',{
                params:{
                    userId:id
                }
            })
         const details = data.details
         setNoti(details)
         dispatch(Notification(data.count))

         
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong please re login')
        }
     }
      if (user) {
       id = user.id;
      }
     if(id){
getNotification();
     }
     
    
  
    }, [])
    



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification Modal"
      className={Style.notification_modal}
      overlayClassName={Style.notification_modal_overlay}
    >
      {noti.length ? (
        noti.map((datas, key) => (
          <>
            <p key={key} onClick={()=>Navigate('/details')} className={Style.bordered}>
              ⏰ <i>You have an upcoming appointment scheduled for today at </i>
              <b>{datas.time}</b>
            </p>
          </>
        ))
      ) : (
        <></>
      )}

      <button className={Style.clearButton} onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

export default NotificationModal;
