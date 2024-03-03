import React, { useEffect, useState } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import ExpirationScreen from "../expirationScreen";
import { darkTheme } from "./mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { changeTheme } from "./mainpageSlice";
import { LoadPage } from "../loadPage/loadPage";

export const MainPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);

  console.log(userData);
  console.log(dark);

  useEffect(() => {
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));

    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch]);
  const [expired, onExpired] = useState(false);

  const mainpageStyle = dark 
    ? `${styles.mainpage} ${styles.dark}`
    : `${styles.mainpage}`

  return (
    load
    ? <LoadPage/>
    : <section className={mainpageStyle} >
        <TopBar/>
        { expired ? <ExpirationScreen/> : null }
      </section>   
  )
}
