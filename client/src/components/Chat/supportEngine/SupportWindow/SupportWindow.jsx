import React from 'react';
import { styles } from "../styles";
import Style from '../../style.module.css'
import EmailForm from './EmailForm';

const SupportWindow = (props) => {
  return (
    <div className={Style.transition_5}
     style={{...styles.supportWindow,
    ...{opacity:props.visible ? '1':'0'}}}
    >

    <EmailForm/>
    </div>
  )
}

export default SupportWindow;