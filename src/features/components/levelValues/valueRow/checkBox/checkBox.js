import React from "react";
import styles from './checkBox.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../../main/mainpageSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const CheckBox = (props) => {
  const { check } = props;

  const dark = useSelector(darkTheme);
  const checkBoxStyle = dark 
  ? `${styles.checkBox} ${styles.dark}`
  : `${styles.checkBox}`

  return (
    <div className={checkBoxStyle}>
      { check
        ? <FontAwesomeIcon icon={ faCheck } className={styles.faCheck} />
        : null
      }
      
    </div>
  )
}
