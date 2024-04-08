import React, { useState } from "react";
import styles from './topBar.module.scss';
import { useSelector } from "react-redux";
import { user, loading } from '../user/userSlice';
import { LangButton } from "../components/langButton/langButton";
import dictionary from '../../dictionary.json';
import { ThemeButton } from "../components/themeButton/themeButton";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars } from '@fortawesome/free-solid-svg-icons'
import { darkTheme } from "../main/mainpageSlice";

export const TopBar = () => {
  const userData = useSelector(user);
  const load = useSelector(loading);
  const dark = useSelector(darkTheme);

  const lang = userData.lang;

  const [show, setShow] = useState(false);

  const headerStyle = dark 
    ? `${styles.header} ${styles.dark}`
    : `${styles.header}`

    const btnPreferencesStyle = show ? `${styles.btnPreferences} ${styles.changed}` : `${styles.btnPreferences}`;

  return (
    <header className={headerStyle}>
    { !load
      ? <>
          <div>
            <h1>{ dictionary.ams_order_form[lang] }</h1>
          </div>

          <button
            type="button"
            className={btnPreferencesStyle}
            onClick={() => setShow(!show)}
          >
            {/* <FontAwesomeIcon icon={ faBars } className={styles.btnPreferencesIcon} /> */}
            <div></div>
          </button>

          { show
            ? <div className={styles.preferences}>
                <div><LangButton/></div>
                <div><ThemeButton/></div>
              </div>
            : null
          }

        </>
      : null
    }   
    </header>      
  )
}
