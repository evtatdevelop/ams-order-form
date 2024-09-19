import React, { useEffect, useState } from "react";
import styles from './datepicker.module.scss';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { darkTheme } from "../../../main/mainpageSlice";

export const DatePicker = props => {
  const { lang, value, setValue, closePicker } = props;
  
  const dark = useSelector(darkTheme);

  const [monthDay, setmonthDay] = useState(new Date(Date.now()))
  useEffect(()=> setmonthDay(value ? value : new Date(Date.now())), [value])

  const year = monthDay.getFullYear(),
        month = monthDay.getMonth(),
        date = new Date(year, month, 1),
        from = date.getTime(),
        to = new Date(year, month + 1, 0, 23, 59, 59, 999 ).getTime(); 
  const monthDays = [];
  const gapDays = [];
  const gapTo = date.getDay() === 0 ? 7 : date.getDay();
  for ( let gapDay = 1; gapDay < gapTo; gapDay++ ) gapDays.push({'key': `gap${gapDay}`})
  for ( let day = from; day < to; day += 24*60*60*1000 ) monthDays.push(new Date(day))

  const setPickerMonth = (direct) => {
    let setMonth;
    switch ( direct ) {
     case 'next': setMonth = month + 1; break;
     case 'prev': setMonth = month - 1; break;
     default: setMonth = new Date(Date.now()).getMonth();
    }
    setmonthDay(new Date(year, setMonth , 1))
  }

  const setPickerYear = (direct) => {
    let setYear;
    switch ( direct ) {
     case 'next': setYear = year + 1; break;
     case 'prev': setYear = year - 1; break;
     default: setYear = new Date(Date.now()).getFullYear();
    }
    setmonthDay(new Date(setYear, month , 1))
  }

  // const [hoursTop, setHoursTop] = useState(-100)
  // const hourScroll = e => {
  //   console.log(e.deltaY);
  //   setHoursTop(hoursTop - 20)
  // }
  const selectInputStyle = dark 
  ? `${styles.picker} ${styles.dark}`
  : `${styles.picker}`

  return (
    <div className={selectInputStyle} id='picker'>
      <nav className={styles.navigation}>
        <div>
          <button type="button" className={styles.navBtn} onClick={() => setPickerMonth('prev')}><FontAwesomeIcon icon={ faCaretLeft } className={styles.faCaret} /></button>
          <button type="button" className={styles.rest} onClick={() => setPickerMonth('curr')}>{monthDay.toLocaleString(lang, { month: 'long' })}</button>         
          <button type="button" className={styles.navBtn} onClick={() => setPickerMonth('next')}><FontAwesomeIcon icon={ faCaretRight } className={styles.faCaret} /></button>          
        </div>
        <div>
          <button type="button" className={styles.navBtn} onClick={() => setPickerYear('prev')}><FontAwesomeIcon icon={ faCaretLeft } className={styles.faCaret} /></button>
          <button type="button" onClick={() => setPickerYear('curr')}>{monthDay.getFullYear()}</button>
          <button type="button" className={styles.navBtn} onClick={() => setPickerYear('next')}><FontAwesomeIcon icon={ faCaretRight } className={styles.faCaret} /></button>         
        </div>
      </nav>

      <div className={styles.dayNames}>
        {[{'en': 'Mon', 'ru': 'пн', "zh": '一'},
          {'en': 'Tue', 'ru': 'вт', "zh": '二'},
          {'en': 'Wed', 'ru': 'ср', "zh": '三'},
          {'en': 'Thu', 'ru': 'чт', "zh": '四'},
          {'en': 'Fri', 'ru': 'пт', "zh": '五'},
          {'en': 'Sat', 'ru': 'сб', "zh": '六'},
          {'en': 'Sun', 'ru': 'вс', "zh": '日'}].map((item, index) => {
            const styleNameDay = index === 5 || index === 6 ? `${styles.weekDayName} ${styles.weekend}` : `${styles.weekDayName}`  
            return <div key={index} className={styleNameDay}>{item[lang.toLowerCase()]}</div>
        })}
      </div>
      
      <main className={styles.dates}>
        {gapDays.map(gapDay => <div key={gapDay.key}></div>)}
        {monthDays.map(day => {
          const d = day.getDate()
          let styleDateCell = day.getTime() === new Date(Date.now()).setHours(0, 0, 0, 0)
            ? `${styles.dateCell} ${styles.today}`
            : `${styles.dateCell}`
          
            styleDateCell = day.getDay() === 0 || day.getDay() === 6
            ? `${styleDateCell} ${styles.weekend}`
            : `${styleDateCell}`
          
            styleDateCell = value && day.getTime() === value.setHours(0, 0, 0, 0)
            ? `${styleDateCell} ${styles.selected}`
            : `${styleDateCell}`

          return <div key={d} 
                    className={styleDateCell}
                    onClick={()=>{
                      setValue(day)
                      closePicker()
                    }}
                  >{`${d}`}</div>
        })}
      </main>

    </div>
  )
}
