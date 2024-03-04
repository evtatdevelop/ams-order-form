import React, { useState } from "react";
import styles from './topBar.module.scss';
import { useSelector } from "react-redux";
import { user, loading } from '../user/userSlice';
import { LangButton } from "../components/langButton/langButton";
import dictionary from '../../dictionary.json';
import { ThemeButton } from "../components/themeButton/themeButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { darkTheme } from "../main/mainpageSlice";
import { corpSyst } from "../corpsystems/corpsystemsSlice";

export const TopBar = () => {
  const userData = useSelector(user);
  const load = useSelector(loading);
  const dark = useSelector(darkTheme);
  const cs = useSelector(corpSyst);

  const lang = userData.lang;

  const [show, setShow] = useState(false);

  const headerStyle = dark 
    ? `${styles.header} ${styles.dark}`
    : `${styles.header}`

  return (
    <header className={headerStyle}>
    { !load
      ? <>
          <div>
            <h1>{ dictionary.ams_order_form[lang] }</h1>
            { cs 
              ? <h3 className={styles.nameForm}>{`${dictionary.application_for_access_to[lang]} ${cs.toUpperCase()}`}</h3>
              : null
            }
          </div>

          { show
            ? <div className={styles.preferences}>
                <div><LangButton/></div>
                <div><ThemeButton/></div>
                <button 
                  type="button"
                  className={styles.btnClosePreferences}
                  onClick={() => setShow(false)}
                >
                  {/* <FontAwesomeIcon icon={ faXmark } className={styles.closePreferencesIcon} /> */}
                  Close
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
