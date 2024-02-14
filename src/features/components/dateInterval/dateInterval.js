/* eslint-disable no-useless-escape */
import React, {useState, useRef } from "react";
import styles from './dateInterval.module.scss';
import DatePicker from "./datePicker";

export const DateInterval = props => {
  const ref = useRef(null)
  const {dateHandler, lang, dateClear} = props
  
  const [value, setValue] = useState("")
  const [jsDateFrom, setJsDateFrom] = useState(null)
  const [jsDateTill, setJsDateTill] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  const onShowPicker = () => setShowPicker(true)

  const onSetDate = date => {
    if ( !date ) { 
      setValue(''); 
      setJsDateFrom(null); 
      setJsDateTill(null); 
      return 
    }

    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
    const strDate = lang === 'RU' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`
    const splitVal = value.split(' - ')
    if ( !jsDateFrom 
      || ( jsDateFrom && jsDateTill ) 
      || ( jsDateFrom && date < jsDateFrom )
    ) {
      setJsDateFrom(date)
      setJsDateTill(null)
      setValue(`${strDate} - `)
    } else { 
      setJsDateTill(date)
      splitVal[1] = strDate 
      setValue(splitVal.join(' - ')) 
      dateHandler([jsDateFrom, date])
    }
  }

  const onInput = val => {}
  const onBlur = () => {}

  const clearInput = () => {
    onSetDate(null)
    setShowPicker(false)
    dateClear()
  }

  const localMask = lang === 'RU' ? 'дд.мм.гггг - дд.мм.гггг' : 'dd-mm-yyyy - dd-mm-yyyy'
  const styleClnBtn = value || showPicker ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const stylePickerWrapper = showPicker ? `${styles.datePickerWrapper} ${styles.showPicker}` : `${styles.datePickerWrapper}  ${styles.hidePicker}`
  const stylePickerCloser = `${styles.pickerCloser}`

  return (
    <div className={styles.dateInterval}>
      <div className={styles.date}>
        <input type="text" className={styles.htmInput}
          value={value}
          onInput={e => onInput(e.target.value)}
          placeholder = {localMask}
          ref={ref}
          onBlur={() => onBlur()}
          onFocus={()=>onShowPicker()}
          readOnly={true}
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
          valueFrom={jsDateFrom}
          valueTill={jsDateTill}
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
        
        </div>
      </div>  
    </div>
  )
}
