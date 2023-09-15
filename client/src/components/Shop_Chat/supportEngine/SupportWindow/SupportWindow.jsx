import React from 'react';
import { styles } from "../styles";
import Style from '../../style.module.css'
import EmailForm from './EmailForm';

const SupportWindow = (props) => {
  return (
    <div className={Style.transition_5}
     style={{...styles.supportWindow,
   
  ...{visibility:props.visible ? 'visible' :'hidden'}}}
    >

    <EmailForm  visible={props.visibile} />
    </div>
  )
}

export default SupportWindow;