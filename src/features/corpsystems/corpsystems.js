import React, { useEffect, useState } from "react";
import styles from './corpsystems.module.scss';
import darkStiles from './darkCorpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
// import { user } from '../user/userSlice';
import ExpirationScreen from "../expirationScreen";
// import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { setSystem, corpSyst } from "./corpsystemsSlice";

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch = useDispatch();
  // const userData = useSelector(user);
  const dark = useSelector(darkTheme);
  const cs = useSelector(corpSyst);

  useEffect(() => {
    dispatch(setSystem(system));
    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch, system]);
  const [expired, onExpired] = useState(false);

  const mainpageStyle = dark 
    ? `${styles.sap} ${darkStiles.dark}`
    : `${styles.sap}`

  return (
    <section className={mainpageStyle} >
      <TopBar/>
      <h3>corpsystems: {cs}</h3>
      { expired ? <ExpirationScreen/> : null }
    </section>
  )
}
