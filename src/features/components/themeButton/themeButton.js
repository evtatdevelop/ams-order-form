import React from "react";
import styles from './themeButton.module.scss';
import darkStiles from './darkThemeButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
// import { user } from "../../user/userSlice";
import { darkTheme, changeTheme } from "../../main/mainpageSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export const ThemeButton = () => {
  // const userData = useSelector(user);
  const dispatch = useDispatch();
  const dark = useSelector(darkTheme);
  // const [checked, setChecked] = useState(dark);

  const themeButtonStyle = dark 
    ? `${styles.themeButton} ${darkStiles.dark}`
    : `${styles.themeButton}`

  const switcherStyle = dark 
    ? `${styles.switcher} ${styles.on}`
    : `${styles.switcher}`

  // const iconBtnStyle = dark 
  //   ? `${styles.iconBtn} ${styles.on}`
  //   : `${styles.iconBtn}`

  const lightIconBtnStyle = dark 
    ? `${styles.lightIconBtn} ${styles.on}`
    : `${styles.lightIconBtn}`

  const darkIconBtnStyle = dark 
    ? `${styles.darkIconBtn} ${styles.on}`
    : `${styles.darkIconBtn}`

  return (
    <div className={themeButtonStyle}>

      <label htmlFor="themeButton" className={lightIconBtnStyle}><FontAwesomeIcon icon={ faSun } className={styles.icon} /></label>
      
      <div className={styles.switchWrap}>
        <input type="checkbox" id='themeButton'
          onChange={ () => dispatch( changeTheme(!dark) ) }
          checked = {dark}
        />

        <label className={switcherStyle} htmlFor="themeButton">
          <div className={styles.slider}></div>
        </label>        
      </div>

      <label htmlFor="themeButton" className={darkIconBtnStyle}><FontAwesomeIcon icon={ faMoon }  className={styles.icon} /></label>

    </div>

  )
}