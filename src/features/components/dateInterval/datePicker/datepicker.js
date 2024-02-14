import React, { useEffect, useState } from "react";
import styles from './datepicker.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export const DatePicker = props => {
  const { lang, valueFrom, valueTill, setValue } = props

  const [monthDay, setmonthDay] = useState(new Date(Date.now()))
  useEffect(()=> setmonthDay(valueFrom ? valueFrom : new Date(Date.now())), [valueFrom])

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

  return (
    <div className={styles.picker}>
      <nav className={styles.navigation}>
        <div>
          <button type="button" onClick={() => setPickerMonth('prev')}><FontAwesomeIcon icon={ faCaretLeft } className={styles.faCaret} /></button>
          <button type="button" className={styles.rest} onClick={() => setPickerMonth('curr')}>{monthDay.toLocaleString(lang, { month: 'long' })}</button>         
          <button type="button" onClick={() => setPickerMonth('next')}><FontAwesomeIcon icon={ faCaretRight } className={styles.faCaret} /></button>          
        </div>
        <div>
          <button type="button" onClick={() => setPickerYear('prev')}><FontAwesomeIcon icon={ faCaretLeft } className={styles.faCaret} /></button>
          <button type="button" onClick={() => setPickerYear('curr')}>{monthDay.getFullYear()}</button>
          <button type="button" onClick={() => setPickerYear('next')}><FontAwesomeIcon icon={ faCaretRight } className={styles.faCaret} /></button>         
        </div>
      </nav>

      <div className={styles.dayNames}>
        {[{'en': 'Mon', 'ru': 'пн'},
          {'en': 'Tue', 'ru': 'вт'},
          {'en': 'Wed', 'ru': 'ср'},
          {'en': 'Thu', 'ru': 'чт'},
          {'en': 'Fri', 'ru': 'пт'},
          {'en': 'Sat', 'ru': 'сб'},
          {'en': 'Sun', 'ru': 'вс'}].map((item, index) => {
            const styleNameDay = index === 5 || index === 6 ? `${styles.weekDayName} ${styles.weekend}` : `${styles.weekDayName}`  
            return <div key={index} className={styleNameDay}>{item[lang]}</div>
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
          
            styleDateCell = valueFrom && day.getTime() >= valueFrom.setHours(0, 0, 0, 0) && valueTill &&  day.getTime() <= valueTill.setHours(0, 0, 0, 0)
            ? `${styleDateCell} ${styles.selected}`
            : `${styleDateCell}`

          return <div key={d} 
                    className={styleDateCell}
                    onClick={()=>{
                      setValue(day)
                      // closePicker()
                    }}
                  >{`${d}`}</div>
        })}
      </main>
    </div>
  )
}
