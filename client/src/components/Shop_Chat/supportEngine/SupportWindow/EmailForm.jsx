import React, { useEffect, useState } from "react";
import { styles } from "../styles.js";
import Style from "../../style.module.css";
import axios from "axios";

import Avatar from "../Avatar.jsx";
import sendIcon from "../../../../../public/contentImages/sendIcon.png";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import frndIcon from "../../../../../public/contentImages/frnd.png";

const EmailForm = (props) => {
  const [messageText, setMessageText] = useState("");

  const [message, setMessage] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [click,setClick]=useState(false)

  const [clickedContactIndex, setClickedContactIndex] = useState(null);

  const [userID, setUserID] = useState({
    userId: "",
    roomId: "",
  });

  const shop = useSelector((state) => state.client.shop);

  console.log(message);

  useEffect(() => {
    async function getChats() {
      try {
        const { data } = await axios.get("/s/getChatShop", {
          params: {
            shopId: shop.id,
          },
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          console.log(data);
          setContacts(data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong please re login");
      }
    }

    getChats();
  }, []);

  const connectedChat = async (roomId, user) => {
    setUserID({
      ...userID,
      userId: user,
      roomId: roomId,
    });

    try {
      const { data } = await axios.get("/s/getDualChat", {
        params: {
          roomId: roomId,
        },
      });

      if (data.not) {
        setMessage([]);
      } else {
        setMessage(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please re login");
    }
  };

  const handleSendMessage = async () => {
    try {
      const { data } = await axios.post("/s/sendedShopMsg", {
        msg: messageText,
        roomId: userID.roomId,
        userId: userID.userId,
        shopId: shop.id,
        sender: "shop",
      });
      if (data.error) {
        toast.error(data.error);
      } else if (data.not) {
        setMessageText("");
      } else {
        setMessage([...message, { sender: "shop", message: data.message }]);

        setMessageText("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please re-Login");
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.contactList}>
        {contacts ? (
          contacts.map((content, key) => (
            <div
              key={key}
              style={{
                ...styles.contact,
                backgroundColor:
                  clickedContactIndex === key ? "#19478E" : "#546B8E",
              }}
              onClick={() => {
                connectedChat(content._id, content.userID);
                setClickedContactIndex(key);
                setClick(true);
              }}
            >
              <img src={frndIcon} alt="" />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div style={styles.chatWindow}>
        <div style={styles.chatHeader}>
          <h2> Chat</h2>
        </div>
        <div style={styles.chatMessages}>
          {message ? (
            message.map((msg, key) => (
              <div
                key={key}
                style={
                  msg.sender === "user"
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
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            style={styles.inputField}
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          {click && (
            <button style={styles.sendButton} onClick={handleSendMessage}>
              <img src={sendIcon} alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
