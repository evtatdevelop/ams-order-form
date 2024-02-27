import React from "react";
import styles from './topBar.module.scss';
import { useSelector } from "react-redux";
import { user, loading } from '../user/userSlice';
import { LangButton } from "../components/langButton/langButton";
import dictionary from '../../dictionary.json';
import { ThemeButton } from "../components/themeButton/themeButton";

export const TopBar = () => {
  const userData = useSelector(user);
  const load = useSelector(loading);

  return (
    <header className={styles.header}>
    { !load
      ? <>
          <h1>{ dictionary.ams_order_form[userData['lang']] }</h1>
          <div className={styles.preferences}>
            <div><LangButton/></div>
            <div><ThemeButton/></div>
          </div>

        </>
      : null
    }   
    </header>      
  )
}
