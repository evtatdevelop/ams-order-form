import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import darkStiles from './darkMaainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../user/userSlice';
import ExpirationScreen from "../expirationScreen";
import { darkTheme } from "./mainpageSlice";
import { TorBar } from "../topBar/topBar";

export const MainPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const dark = useSelector(darkTheme);

  console.log(userData);

  useEffect(() => {
    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch]);
  const [expired, onExpired] = useState(false);

  const mainpageStyle = dark 
    ? `${styles.mainpage} ${darkStiles.dark}`
    : `${styles.mainpage}`

  return (
    <section className={mainpageStyle} >
      <TorBar/>
      { expired ? <ExpirationScreen/> : null }
    </section>
  )
}
