import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import ExpirationScreen from "../expirationScreen";
import { LangButton } from "../components/langButton/langButton";

export const MainPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const load = useSelector(loading);

  useEffect(() => {
    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch]);
  const [expired, onExpired] = useState(false);

  return (
    <section className={styles.mainpage} >
      { !load
        ? 
          <header className={styles.header}>
            <h1>{userData.lang === 'EN' ? 'AMS Order Form' : 'Форма заявки АСУЗ'}</h1>
              <LangButton/>        
           </header>
        : null
      }

      { expired ? <ExpirationScreen/> : null }
    </section>
  )
}

