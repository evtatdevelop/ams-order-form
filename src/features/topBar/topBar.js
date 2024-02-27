import React, { useState } from "react";
import styles from './topBar.module.scss';
import { useSelector } from "react-redux";
import { user, loading } from '../user/userSlice';
import { LangButton } from "../components/langButton/langButton";
import dictionary from '../../dictionary.json';
import { ThemeButton } from "../components/themeButton/themeButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const TopBar = () => {
  const userData = useSelector(user);
  const load = useSelector(loading);

  const [show, setShow] = useState(false);

  return (
    <header className={styles.header}>
    { !load
      ? <>
          <h1>{ dictionary.ams_order_form[userData['lang']] }</h1>

          { show
            ? <div className={styles.preferences}>
                <div><LangButton/></div>
                <div><ThemeButton/></div>
              </div>
            : <button type="button" className={styles.btnPreferences}
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
