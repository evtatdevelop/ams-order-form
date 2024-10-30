import React, { useEffect } from "react";
import styles from './statusPage.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, } from '../user/userSlice';
import { darkTheme, changeTheme, } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { orderData, loading, getOrder } from "./statusPageSlice";
import { useParams } from "react-router-dom";
import { StatusLoader } from "./statusLoader";
import { CorpsystStatus } from "./corpsystStatus/corpsystStatus";
import dictionary from "../../dictionary.json";
import { cleanSentStatusPage } from "../corpsystems/corpsystemsSlice";

export const StatusPage = () => {
  
  const dispatch  = useDispatch();
  const { system, id } = useParams();
  const { lang, api_key, } = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);
  const order = useSelector(orderData);

  useEffect(() => {
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrder( {'api_key': api_key, 'order_type': system, 'order_id': id, } ));
    dispatch(cleanSentStatusPage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const statusPageStyle = dark 
    ? `${styles.statusPage} ${styles.dark}`
    : `${styles.statusPage}`

  return (
    <section className={statusPageStyle} >
      <div className={styles.wrapperCS} >
        <TopBar/>
        
        { !load
          ? order && Object.keys(order).length
            ? <div className={styles.form}>
                { system === 'corpsystems'
                  ? <CorpsystStatus/>
                  : null }
                  
                { system === 'worplace'
                  ? 'worplace'
                  : null }

                { system === 'resouces'
                  ? 'resouces'
                  : null }
              </div>
            : <div className={styles.noDate}>{dictionary.no_data[lang]}</div>  
          : <div className={styles.pageLoad}><StatusLoader/></div>
        }

      </div>
    </section>    
  )
}
