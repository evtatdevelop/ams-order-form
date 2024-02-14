import React from "react";
import styles from './expirationScreen.module.scss';
import { useSelector } from "react-redux";
import { user } from "../user/userSlice";
import dictionary from '../../dictionary.json';

export const ExpirationScreen = () => {
  const userData = useSelector(user);


  return (
    <div className={styles.expirationScreen}>
    
      <p className={styles.msgReload}>{dictionary.page_timeout_exceeded[userData['lang']]}</p>
      <a href={window.location.href} className={styles.btnReload}>{dictionary.continue_work[userData['lang']]}</a>
    
    </div>
  )
}