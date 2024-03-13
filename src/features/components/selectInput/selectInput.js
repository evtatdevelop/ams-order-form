import React, { useState, useRef  } from "react";
import styles from './selectInput.module.scss';
import { useSelector } from "react-redux";
import { searchUsers } from "../../user/userSliceAPI";
import { TestLoader } from "./testLoader";
import { darkTheme } from "../../main/mainpageSlice";
import { user } from "../../user/userSlice";

export const SelectInput = props => {
  const ref = useRef(null)
  const {selectHandler, placeholder, val, name} = props
  const { api_key } = useSelector(user);
  const dark = useSelector(darkTheme);

  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false)
  const [timerId, setTimerId] = useState(null)
  const [selectList, setSelectList] = useState([])
  const [loading, setloading] = useState(false)
    
  const onSearchUsers  = (string) => {
    if ( string ) searchUsers({'string': string, 'api_key': api_key}).then(value => {
      setSelectList(value)
      setShow(true)
      setloading(false)
    }) 
  }

  const onInput = val => {
    setloading(true)
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => onSearchUsers(val), 300);
    setTimerId(timer);
  }

  const onChange = item => {
    setValue(
      item.middle_name
      ? `${item.last_name ? item.last_name : ''} ${item.first_name ? item.first_name : ''} ${item.middle_name ? item.middle_name : ''}`
      : `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`
    );
    selectHandler(item.id)
    setShow(false)
  }

  const onFocus = e => {
    if ( e.target.value ) setloading(true)
    onSearchUsers(e.target.value)
  }

  const onBlur = () => setTimeout(()=>setShow(false), 100)

  const clearInput = () => {
    clearTimeout(timerId);
    setValue('')
    setSelectList([])
    setTimeout(()=>ref.current.focus(), 100)
  }

  const styleClnBtn = value && !loading ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleLoading = loading ? `${styles.loading} ${styles.showLoading}` : `${styles.loading}`
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  const selectInputStyle = dark 
  ? `${styles.selectInput} ${styles.dark}`
  : `${styles.selectInput}`

  return (
    <div className={selectInputStyle}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          onInput={e => onInput(e.target.value)}
          onFocus={(e)=>onFocus(e)}
          onBlur={()=>onBlur()}
          ref={ref}
        />
        {
          <div className={styleLoading}><TestLoader/></div>
        }
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>
      <ul className={styleSelectList}>
        {selectList 
          ? selectList.map(item => 
            <li key={`${item.id}${name}`} className={styles.itemLi}>
              <input type="radio" 
                value={item.id} 
                id={`${item.id}${name}`} 
                name={name}
                onClick={()=>onChange(item)}
              /><label htmlFor={`${item.id}${name}`}>{
                item.middle_name 
                ? `${item.last_name ? item.last_name : ''} ${item.first_name ? item.first_name : ''} ${item.middle_name ? item.middle_name : ''} ${item.email ? `(${item.email})` : ''}`
                : `${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''} ${item.email ? `(${item.email})` : ''}`
              }</label>
            </li>
          )
          : null  
      }
      </ul>
    </div>
  )
}
