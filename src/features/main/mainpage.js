import React, { useEffect } from "react";
import styles from './mainpage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import { darkTheme } from "./mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { changeTheme, } from "./mainpageSlice";
import { Outlet } from "react-router-dom";

export const MainPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);

  console.log(userData);

  useEffect(() => {
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [dispatch]);
  
  const mainpageStyle = dark 
    ? `${styles.mainpage} ${styles.dark}`
    : `${styles.mainpage}`

  return (
    <>
      {load
      ? null
      : <section className={mainpageStyle} >
          <TopBar/>
          </section>
      }
      <Outlet />
    </>
  )
}
