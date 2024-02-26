import React from "react";
import styles from './themeButton.module.scss';
import darkStiles from './darkThemeButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
// import { user } from "../../user/userSlice";
import { darkTheme, changeTheme } from "../../main/mainpageSlice";

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


  return (
    <div className={themeButtonStyle}>
      
      <input type="checkbox" id='themeButton'
        onChange={ () => dispatch( changeTheme() ) }
        checked = {dark}
      />

      <label className={switcherStyle} htmlFor="themeButton">
        <div className={styles.slider}></div>
      </label>

    </div>

  )
}