import React, { useState } from "react";
import { styles } from "./styles.js";
import Style from "../style.module.css";

const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={props.style}>
      <div
        className={Style.transition_3}
        style={{ ...styles.avatarHello, ...{ opacity: hovered ? "1" : "0" } }}
      >
        hey its abhii..!!
      </div>
      <div
        className={Style.transition_3}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={()=> props.onClick && props.onClick()}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "1px solid #fff" : "4px solid black" },
        }}
      />
    </div>
  );
};

export default Avatar;
