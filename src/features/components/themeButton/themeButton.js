import React from "react";
import styles from './themeButton.module.scss';
import darkStiles from './darkThemeButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
// import { user } from "../../user/userSlice";
import { darkTheme, changeTheme } from "../../main/mainpageSlice";

export const ThemeButton = () => {
  // const userData = useSelector(user);
  const dispatch = useDispatch();
  // const lang = userData['lang'];
  const dark = useSelector(darkTheme);

  const themeButtonStyle = dark 
    ? `${styles.themeButton} ${darkStiles.dark}`
    : `${styles.themeButton}`


  return (
    <div className={themeButtonStyle}>
      <button type='button'
        className={styles.themeSwitcher}
        onClick={ () => dispatch( changeTheme() ) }
      >dark</button>
      
    </div>

  )
}