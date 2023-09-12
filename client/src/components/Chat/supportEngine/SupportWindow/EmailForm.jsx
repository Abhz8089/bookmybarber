import React, { useState } from 'react';
import {styles} from '../styles.js';
import Style from '../../style.module.css';
// import { LoadingOutlined } from "@ant-design/icons"; 


import Avatar from '../Avatar.jsx';

const EmailForm = (props) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

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
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>
      <div
        className={Style.transition_5}
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "0.33" : "0",
          },
        }}
      />
      {/* <ClipLoader className={Style.transition_5}
      style={{...styles.loadingIcon,
      ...{
        zIndex:loading?'18':'-1',
        opacity:loading? '1':'8',
        fontSize:'82px',
        top:'calc(50% - 41px)',
        left:'calc(50% - 41px)'
      }}} /> */}
      <div style={{position:'absolute',height:'100%',width:'100%',textAlign:'center'}}>
        <Avatar
         style={{
            position:'relative',
            left:'calc(50% - 44px',
            top:'20%'
         }}

        />
        

      </div>
    </div>
  );
}

export default EmailForm