import React, { useEffect, useState } from 'react';
import {styles} from '../styles.js';
import Style from '../../style.module.css';
// import { LoadingOutlined } from "@ant-design/icons"; 
import axios from 'axios'

import Avatar from '../Avatar.jsx';
import sendIcon from '../../../../../public/contentImages/sendIcon.png'
import {toast} from 'react-hot-toast';
import { useSelector } from 'react-redux';


 

const EmailForm = (props) => {
   
    const [chat,setChat]=useState(false);
    const [messageText,setMessageText] = useState('')
    const [sendedMessage,setSendedMessage] = useState([])
    const [message, setMessage] = useState([]);

    const user = useSelector((state)=>state.client.user)
     const shop = useSelector((state) => state.client.shopDetails);

     console.log(message)
     useEffect(() => {
        
      async function getChats(){
      
        try {
          const { data } = await axios.get("/getChats", {
            params: {
              shopId: shop[0]._id,
              userId: user.id,
            },
          });
          
          if(data.not){
            setMessageText('')
          }else{
            setMessage(data)
          }

        } catch (error) {
          console.log(error)
          toast.error('Something went wrong please re login')
        }
      }
     
      getChats();
     }, [])
     

    

    const handleSendMessage = async() => {

      
      
      try {
       const {data} = await axios.post('/sendedMsg',{
        msg:messageText,
        shopId:shop[0]._id,
        userId:user.id,
        sender:"user"
       })
       if(data.error){
        toast.error(data.error)
       }else if(data.not){
        setMessageText('')
       }else{
         setMessage([...message, { sender: "user", message: data.message }]);

         setMessageText(""); 
       }
        
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong please re-Login')
      }


    };
    
   

  return (
    <div
      style={{
        ...styles.emailFormWindow,

        ...{
          height: "100%",
          opacity: "1",
        },
      }}
    >
      {chat ? (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h2> Chat</h2>
          </div>
          <div style={styles.chatMessages}>
            {/* {sendedMessage.length ? (
              sendedMessage.map((msg, key) => (
                <div
                  key={key}
                  style={{
                    ...styles.message,
                    ...(msg.sender === "user" ? styles.userMessage : {}),
                  }}
                >
                  {msg}
                </div>
              ))
            ) : (
              <></>
            )} */}

            {message ? (
              message.map((msg, key) => (
                <div
                  key={key}
                  style={
                    msg.sender === "shop"
                      ? { ...styles.message, ...styles.userMessage }
                      : { ...styles.message }
                  }
                >
                  {msg.message}
                </div>
              ))
            ) : (
              <></>
            )}

            {/* <div style={styles.message}>Bot: I'm just a static example.</div> */}
            {/* <div style={{ ...styles.message, ...styles.userMessage }}>
              User: That's okay. Can you help me with something?
            </div> */}
          </div>

          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.inputField}
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button
              style={styles.sendButton}
              className={Style.sendButton}
              onClick={handleSendMessage}
            >
              <img src={sendIcon} className={Style.img} alt="" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ height: "0px" }}>
            <div style={styles.stripe} />
          </div>

          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Avatar
              style={{
                position: "relative",
                left: "calc(50% - 44px",
                top: "10%",
              }}
            />
            <div style={styles.topText}>
              Welcome to my <br /> Support 👋
            </div>

            <div
              style={{
                ...styles.bottomText,
                ...{
                  marginTop: "2rem",
                },
              }}
            >
              <button className={Style.button} onClick={() => setChat(true)}>
                Start
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EmailForm





