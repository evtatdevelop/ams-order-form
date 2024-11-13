import React, { useState, } from "react";
import styles from './hint.module.scss';
import { useSelector, } from "react-redux";
import { user } from '../../user/userSlice';
import { hintsData } from "../../corpsystems/corpsystemsSlice";
import { darkTheme } from "../../main/mainpageSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, } from '@fortawesome/free-solid-svg-icons'

export const Hint = props => {
  const { isData, field, over } = props;
  const [showHint, setShowHint] = useState(true);  
  const [nowHide, setnowHide] = useState(true);  
  const dark = useSelector(darkTheme);
  const {lang } = useSelector(user);
  const hints = useSelector(hintsData);



  let oredrUserStyle = dark 
    ? `${styles.hint} ${styles.dark}`
    : `${styles.hint}`
  
  oredrUserStyle = (!isData && showHint) || (over === field && nowHide)
    ? `${oredrUserStyle} ${styles.show}`
    : `${oredrUserStyle}`

    

  const hideHint = () => {
    setShowHint(false);
    setnowHide(false)
    setTimeout(() => setnowHide(true),1000)
  }  

  return (
    hints[field]?.name[lang]
    ? <div className={oredrUserStyle}>
        {hints[field].name[lang]}
        { showHint && !isData
          ? <button className={styles.hintCloser}
              type="button"
              onClick={() => hideHint()}
            ><FontAwesomeIcon icon={ faXmark }/></button>
          :null  
        }

      </div>
    :null  
  )
}
