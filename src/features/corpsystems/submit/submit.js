import React from "react";
import styles from './submit.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import dictionary from '../../../dictionary.json';
import { user, } from '../../user/userSlice';
import { SubmitlDataLoader } from "./dataLoader";

export const Submit = () => {
  const dark = useSelector(darkTheme);
  const { lang, api_key, } = useSelector(user);

  let submitStyle = dark 
    ? `${styles.submit} ${styles.dark}`
    : `${styles.submit}`

  return (
    <div className={submitStyle}>
      <button type="button" className={styles.btnSubmit}
        onClick={()=>console.log('Submitting')}
      > { false
          ? <div className={styles.loader}><SubmitlDataLoader/></div>
          : dictionary.submit_approval[lang]
        }    
      </button>
    </div>
  )
}
