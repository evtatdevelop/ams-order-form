import React, { useState } from "react";
import styles from './rowHint.module.scss';
import { useSelector, } from "react-redux";
import { hintsData } from "../../corpsystems/corpsystemsSlice";
import { user } from "../../user/userSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, } from '@fortawesome/free-solid-svg-icons'
import { darkTheme } from "../../main/mainpageSlice";

export const RowHint = props => {
  const { children, label, field, thereIs, isData } = props

  const [showHint, setShowHint] = useState(true);  
  const [overField, setOverField] = useState(false);  
  const [nowHide, setnowHide] = useState(true);  

  const hints = useSelector(hintsData);  
  const {lang } = useSelector(user);  
  const dark = useSelector(darkTheme);

  let rowHintStyle = dark 
    ? `${styles.rowHint} ${styles.dark}`
    : `${styles.rowHint}`
  
  const oredrUserStyle = (!isData && showHint) || (overField && nowHide)
    ? `${styles.hint} ${styles.show}`
    : `${styles.hint}`

  const hideHint = () => {
    setShowHint(false);
    setnowHide(false)
    setOverField(false)
    setTimeout(() => setnowHide(true),1000)
  } 

  return (
    <div className={rowHintStyle}>
      <label htmlFor={field}>{label}</label>
      <div className={styles.wrapField}
        onMouseOver = {() => setOverField(true)}
        onMouseOut = {() => setOverField(false)}                    
      >
        {children}
        { thereIs && hints[field]?.name[lang]
          ? <div className={oredrUserStyle}>
              {hints[field].name[lang]}
              { !isData && showHint
                ? <button className={styles.hintCloser}
                    type="button"
                    onClick={() => hideHint()}
                  ><FontAwesomeIcon icon={ faXmark }/></button>
                :null  
              }
            </div>
          :null  
        }
      </div>
    </div>
  )
}
