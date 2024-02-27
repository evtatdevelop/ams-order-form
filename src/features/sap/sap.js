import React, { useEffect, useState } from "react";
import styles from './sap.module.scss';
import darkStiles from './darkSap.module.scss';
import { useSelector, useDispatch } from "react-redux";
// import { user } from '../user/userSlice';
import ExpirationScreen from "../expirationScreen";
// import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";

export const Sap = () => {
  const dispatch = useDispatch();
  // const userData = useSelector(user);
  const dark = useSelector(darkTheme);

  // console.log(userData);
  // console.log(dictionary);

  useEffect(() => {
    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch]);
  const [expired, onExpired] = useState(false);

  const mainpageStyle = dark 
    ? `${styles.sap} ${darkStiles.dark}`
    : `${styles.sap}`

  return (
    <section className={mainpageStyle} >
      <TopBar/>
      SAP
      { expired ? <ExpirationScreen/> : null }
    </section>
  )
}
