import React from "react";
import styles from './infoField.module.scss';
import { darkTheme } from "../../main/mainpageSlice";
import { useSelector } from "react-redux";

export const InfoField = props => {
  const {placeholder, val, readonly} = props
  
  const dark = useSelector(darkTheme);

  const styleField = readonly ? `${styles.field} ${styles.readonly}` : `${styles.field}`
  const cinfoFieldStyle = dark 
    ? `${styles.infoField} ${styles.dark}`
    : `${styles.infoField}`

  return (
    <div className={cinfoFieldStyle}>
      <div className={styleField}>{val ? val : placeholder}</div>
    </div>
  )
}
