import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import darkStiles from './darkMaainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import ExpirationScreen from "../expirationScreen";
import { LangButton } from "../components/langButton/langButton";
import dictionary from '../../dictionary.json';
import { darkTheme } from "./mainpageSlice";
import { ThemeButton } from "../components/themeButton/themeButton";

export const MainPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const load = useSelector(loading);
  const dark = useSelector(darkTheme);

  useEffect(() => {
    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch]);
  const [expired, onExpired] = useState(false);

  const mainpageStyle = dark 
    ? `${styles.mainpage} ${darkStiles.dark}`
    : `${styles.mainpage}`

  return (
    <section className={mainpageStyle} >
      { !load
        ? <header className={styles.header}>
            <h1>{ dictionary.ams_order_form[userData['lang']] }</h1>
              
              <ThemeButton/>

              <LangButton/>
           </header>
        : null
      }

      { expired ? <ExpirationScreen/> : null }
    </section>
  )
}
