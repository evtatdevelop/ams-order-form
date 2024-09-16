import React, { useState, useEffect, } from "react";
import styles from './dateInterval.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../../../dictionary.json";
import { user } from '../../../../user/userSlice';
import { setDates, editSandBoxData, roleSendboxData } from "../../../corpsystemsSlice";

import { InputDate } from "../../../../components/inputDate/inputDate";

export const DateInterval = () => {
  const dispatch = useDispatch();
  const { lang, } = useSelector(user);
  const editSandBox = useSelector(editSandBoxData);
  const roleSendbox = useSelector(roleSendboxData);
  
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    const thisFrom = getLocalDate(from) ?? "" 
    const thisTo = getLocalDate(to) ?? ""; 

    // if ( from && to ) {
      // console.log( (to-from)/1000/3600/24 + 1 );
      dispatch(setDates({"from": thisFrom, "to": thisTo }));
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[from, to]);

  useEffect(() => {
    if ( editSandBox ) {
      if ( roleSendbox.dates.from ) setFrom(getInputDate(roleSendbox.dates.from));
      if ( roleSendbox.dates.to ) setTo(getInputDate(roleSendbox.dates.to));
    }
  }, [editSandBox, roleSendbox])

  const getLocalDate = date => {
    if ( !date ) return '';
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
    return lang.toUpperCase() === 'RU' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`;
  };

  const getInputDate = value => {
    if ( !value ) return null;
    let val;
    if ( /\./.test(value) ) val = value.split('.');
    if ( /-/.test(value) ) val = value.split('-');
    if ( /\//.test(value) ) val = value.split('/');
    // if ( !val || val.length !== 3) { onSetDate(null); return }
    const inputDate = new Date(`${val[1]}-${val[0]}-${val[2]}`);
    // if ( !inputDate.getTime() ) { onSetDate(null); return }
    return inputDate;
  }

  const intervalLogic = ( item, val ) => {
    if ( item === 'from' ) {
      setFrom(val);
      if ( val && (to-val)/1000/3600/24 < 0 ) setTo(null);
    }
    if ( item === 'to' ) {
      setTo(val);
      if ( val && (val-from)/1000/3600/24 < 0 ) setFrom(null);
    }
  }

  return (
    <div className={styles.dateInterval}>
      <div className={styles.partInterval}>
        <div className={styles.intervalName}>{dictionary.from[lang]}</div>
        <InputDate
          dateHandler = { val => intervalLogic('from', val) }
          lang = {lang}
          val = {from}
        />        
      </div>
      <div className={styles.partInterval}>
        <div className={styles.intervalName}>{dictionary.to[lang]}</div>
          <InputDate
            dateHandler = { val => intervalLogic('to', val) }
            lang = {lang}
            val = {to}
          />      
      </div>

    </div>
  )
}
