/* eslint-disable no-useless-escape */
import React, {useState, useRef } from "react";
import styles from './inputDate.module.scss';
import DatePicker from "./datePicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export const InputDate = props => {
  const ref = useRef(null)
  const {dateHandler, lang} = props
  
  const [value, setValue] = useState("")
  const [jsDate, setJsDate] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  const onShowPicker = () => {
    setShowPicker(true)
  }

  const onSetDate = date => {
    if ( !date ) { setValue(''); setJsDate(null); return }
    setJsDate(date)
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
    setValue(lang === 'ru' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`)
    dateHandler(date)
    // setShowPicker(false)
  }

  const onInput = val => {
    let dateVal = val.replace(/[^0-9\.\/-: ]/ig, "")
    dateVal = dateVal.replace(/\.{2,}/ig, ".")
    dateVal = dateVal.replace(/\/{2,}/ig, "/")
    dateVal = dateVal.replace(/-{2,}/ig, "-")
    setValue(dateVal);
  }

  const onBlur = () => {
    let val;
    if ( /\./.test(value) ) val = value.split('.');
    if ( /-/.test(value) ) val = value.split('-');
    if ( /\//.test(value) ) val = value.split('/');
    if ( !val || val.length !== 3) { onSetDate(null); return }
    const inputDate = new Date(`${val[1]}-${val[0]}-${val[2]}`);
    if ( !inputDate.getTime() ) { onSetDate(null); return }
    onSetDate(inputDate)
  }

  const clearInput = () => {
    onSetDate(null)
    setShowPicker(false)
    // ref.current.focus();
  }

  const localMask = lang === 'ru' ? 'дд.мм.гггг' : 'dd-mm-yyyy'
  const styleClnBtn = value || showPicker ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const stylePickerWrapper = showPicker ? `${styles.datePickerWrapper} ${styles.showPicker}` : `${styles.datePickerWrapper}  ${styles.hidePicker}`
  // const stylePickerCloser = jsDate ? `${styles.pickerCloser} ${styles.showPickerCloser}` : `${styles.pickerCloser}  ${styles.hidePickerCloser}`
  const stylePickerCloser = `${styles.pickerCloser}`
  const styleIconClock = `${styles.iconClock}`

  return (
    <div className={styles.calendar}>
      <div className={styles.date}>
        <input type="text" className={styles.htmInput}
          value={value}
          onInput={e => onInput(e.target.value)}
          placeholder = {localMask}
          ref={ref}
          onBlur={() => onBlur()}
          onFocus={()=>onShowPicker()}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>

      <div className={stylePickerWrapper}>
        <DatePicker
          lang={lang}
          value={jsDate}
          setValue={onSetDate}
          closePicker={()=>setShowPicker(false)}
        />

        <div className={styles.pickerControl}>
          <button type="button" 
            className={stylePickerCloser}
            onClick={()=>{
              setShowPicker(false)
              onBlur()
            }}
          >&times;</button>

          <button type="button" 
            className={styleIconClock}
            onClick={()=>{}}
          ><FontAwesomeIcon icon={ faClock } className={styles.faCaret} /></button>          
        </div>

      </div>  


    </div>
  )
}
