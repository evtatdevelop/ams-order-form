import React, { useState, useEffect, useRef } from "react";
import styles from './dateInterval.module.scss';
import { useSelector } from "react-redux";
import dictionary from "../../../../../dictionary.json";
import { user } from '../../../../user/userSlice';

import { InputDate } from "../../../../components/inputDate/inputDate";

export const DateInterval = () => {
  const { lang, } = useSelector(user);

  

  return (
    <div className={styles.dateInterval}>
      <div className={styles.partInterval}>
        <div className={styles.intervalName}>From</div>
        <InputDate
          dateHandler = { val => console.log(val) }
          lang = {lang}
        />        
      </div>
      <div className={styles.partInterval}>
        <div className={styles.intervalName}>To</div>
          <InputDate
            dateHandler = { val => console.log(val) }
            lang = {lang} 
          />      
      </div>

    </div>
  )
}
