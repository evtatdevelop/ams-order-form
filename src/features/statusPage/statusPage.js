import React, { useEffect } from "react";
import styles from './statusPage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, } from '../user/userSlice';
import { darkTheme, } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { orderData, loading, getOrder } from "./statusPageSlice";
import { useParams } from "react-router-dom";

export const StatusPage = () => {
  
  const dispatch  = useDispatch();
  const { system, id } = useParams();
  const { lang, api_key, } = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);

  // console.log(userData);

  useEffect(() => {
    dispatch(getOrder( {'api_key': api_key, 'order_type': system, 'order_id': id, } ))
    
  }, []);
  
  const statusPageStyle = dark 
    ? `${styles.statusPage} ${styles.dark}`
    : `${styles.statusPage}`

  return (
    <section className={statusPageStyle} >
      <div className={styles.wrapperCS} >
        <TopBar/>
        
        { !load
          ? <form className={styles.form}>
              <h1>Status Page</h1>
              <p>{ system }</p>
              <p>{ id }</p>
            </form>
          : null
        }
      </div>
    </section>    
  )
}
