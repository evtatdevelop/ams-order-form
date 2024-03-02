import React, { useState } from "react";
import styles from './topBar.module.scss';
import { useSelector } from "react-redux";
import { user, loading } from '../user/userSlice';
import { LangButton } from "../components/langButton/langButton";
import dictionary from '../../dictionary.json';
import { ThemeButton } from "../components/themeButton/themeButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { darkTheme } from "../main/mainpageSlice";

export const TopBar = () => {
  const userData = useSelector(user);
  const load = useSelector(loading);
  const dark = useSelector(darkTheme);

  const [show, setShow] = useState(false);

  const headerStyle = dark 
    ? `${styles.header} ${styles.dark}`
    : `${styles.header}`

  return (
    <header className={headerStyle}>
    { !load
      ? <>
          <h1>{ dictionary.ams_order_form[userData['lang']] }</h1>

          { show
            ? <div className={styles.preferences}>
                <div><LangButton/></div>
                <div><ThemeButton/></div>
                <button 
                  type="button"
                  className={styles.btnClosePreferences}
                  onClick={() => setShow(false)}
                >
                  <FontAwesomeIcon icon={ faXmark } className={styles.closePreferencesIcon} />
                </button>
              </div>

            : <button
                type="button"
                className={styles.btnPreferences}
                onClick={() => setShow(true)}
              >
                <FontAwesomeIcon icon={ faBars } className={styles.btnPreferencesIcon} />
              </button>  
          }

        </>
      : null
    }   
    </header>      
  )
}
