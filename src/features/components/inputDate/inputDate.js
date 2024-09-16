/* eslint-disable no-useless-escape */
import React, {useState, useRef, useEffect, } from "react";
import styles from './inputDate.module.scss';
import DatePicker from "./datePicker";

export const InputDate = props => {
  const ref = useRef(null)
  const {dateHandler, lang, val} = props

  const [value, setValue] = useState('')
  const [jsDate, setJsDate] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => { 
    
    if ( !val ) {
      // console.log('useEffect', getLocalDate(val));
      setValue(''); 
      setJsDate(null)      
    } else {
      setJsDate(val);
      setValue( getLocalDate(val) )
    }
; 

   },[val])

  const getLocalDate = date => {
    if ( !date ) return '';
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
    return lang.toUpperCase() === 'RU' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`;
  };

  const onSetDate = date => {
    if ( !date ) { 
      dateHandler(null);
      setValue(''); 
      setJsDate(null); 
      return 
    }
    setJsDate(date);
    dateHandler(date);
    setValue( getLocalDate(date) )
  }

  const onInput = val => {
    setShowPicker(false)
    let dateVal = val
      .replace(/[^0-9\.\/-: ]/ig, "")
      .replace(/\.{2,}/ig, ".")
      .replace(/\/{2,}/ig, "/")
      .replace(/-{2,}/ig, "-");
    setValue(dateVal);
  }

  const onBlur = () => {
    // onSetDate(getInputDate());
  }

  const getInputDate = () => {
    let val;
    if ( /\./.test(value) ) val = value.split('.');
    if ( /-/.test(value) ) val = value.split('-');
    if ( /\//.test(value) ) val = value.split('/');
    if ( !val || val.length !== 3) { onSetDate(null); return }
    const inputDate = new Date(`${val[1]}-${val[0]}-${val[2]}`);
    if ( !inputDate.getTime() ) { onSetDate(null); return }
    return inputDate;
  }

  const clearInput = () => {
    onSetDate(null)
    setShowPicker(false)
    ref.current.focus();
  }

  const keyDown = e => {
    // console.log(e.code);
    if ( ['ArrowDown', 'ArrowUp', 'Enter', 'Escape', ].includes(e.code) ) e.preventDefault();
    switch ( e.code ) {
      case 'ArrowDown': 
        if ( !showPicker ) setShowPicker(true);
        break;
      case 'ArrowUp': 
        if ( showPicker ) setShowPicker(false);
        break;
      case 'NumpadEnter':
      case 'Enter':
        if ( value ) onSetDate(getInputDate());
        else setShowPicker(true);
        break;
      case 'Escape':
        if ( showPicker) setShowPicker(false);
        else clearInput();
        break;
      case 'Tab':
        if ( showPicker) setShowPicker(false);
        break;

      default:
        break;
    } 
  }


  const outClick = (e) => {
    if ( !e.target.closest('#picker') ) {
      setShowPicker(false)
      document.removeEventListener("mouseup", outClick);
    }
  }

  const onShowPicker = () => {    
    document.addEventListener("mouseup", outClick);
    setShowPicker(!showPicker);
  }

  const localMask = lang.toUpperCase() === 'RU' ? 'дд.мм.гггг' : 'dd-mm-yyyy'
  const styleClnBtn = value || showPicker ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const stylePickerWrapper = showPicker ? `${styles.datePickerWrapper} ${styles.showPicker}` : `${styles.datePickerWrapper}  ${styles.hidePicker}`

  return (
    <div className={styles.calendar}>
      <div className={styles.date}>
        <input type="text" className={styles.htmInput}
          value={value}
          onInput={e => onInput(e.target.value)}
          placeholder = {localMask}
          ref={ref}
          onBlur={() => onBlur()}
          // onFocus={()=>onShowPicker()}
          onClick={()=>onShowPicker()}
          onKeyDown={(e)=>keyDown(e)}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>

      <div className={stylePickerWrapper} id='datePickerWrapper' >
        <DatePicker
          lang={lang}
          value={jsDate}
          setValue={onSetDate}
          closePicker={()=>setShowPicker(false)}
        />

      </div>  


    </div>
  )
}
