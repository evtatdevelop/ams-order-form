import React, { useState, useEffect, useRef } from "react";
import styles from './dateInterval.module.scss';
import { useSelector } from "react-redux";
import dictionary from "../../../../../dictionary.json";
import { user } from '../../../../user/userSlice';

import { InputDate } from "../../../../components/inputDate/inputDate";

export const DateInterval = () => {
  const { lang, } = useSelector(user);


  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  //toDo: !!!
  const intervalLogic = ( item, val ) => {
    console.log(item, val);
    if ( item === 'from' ) {
      setFrom(val);
      if ( (to-val)/1000/3600/24 < 0 ) {
        setTo(null);
      }      
    }
    if ( item === 'to' ) {
      setTo(val);
      if ( (val-from)/1000/3600/24 < 0 ) {
        setFrom(null);
      }
    }
  }

  return (
    <div className={styles.dateInterval}>
      <div className={styles.partInterval}>
        <div className={styles.intervalName}>From</div>
        <InputDate
          dateHandler = { val => intervalLogic('from', val) }
          lang = {lang}
          val = {from}
        />        
      </div>
      <div className={styles.partInterval}>
        <div className={styles.intervalName}>To</div>
          <InputDate
            dateHandler = { val => intervalLogic('to', val) }
            lang = {lang}
            val = {to}
          />      
      </div>

    </div>
  )
}
