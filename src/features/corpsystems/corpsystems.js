import React, { useEffect, useState } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
// import { user } from '../user/userSlice';
import ExpirationScreen from "../expirationScreen";
// import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { setSystem, corpSyst } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch = useDispatch();
  // const userData = useSelector(user);
  const dark = useSelector(darkTheme);
  const cs = useSelector(corpSyst);

  useEffect(() => {
    dispatch(setSystem(system));
    
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));

    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch, system]);
  const [expired, onExpired] = useState(false);

  const corpsystemsStyle = dark 
    ? `${styles.corpsystems} ${styles.dark}`
    : `${styles.corpsystems}`

  return (
    <section className={corpsystemsStyle} >
      <div className={styles.wrapperCS} >
        <TopBar/>
        <section className={styles.form}>
          <h3>corpsystems: {cs}</h3>
        </section>
      </div>

      { expired ? <ExpirationScreen/> : null }
    </section>
  )
}
