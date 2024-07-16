import React from "react";
import styles from './checkBox.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../../main/mainpageSlice";

export const CheckBox = (props) => {
  const { check } = props;

  console.log(check ? 'check' : 'unCheck' );

  const dark = useSelector(darkTheme);
  const checkBoxStyle = dark 
  ? `${styles.checkBox} ${styles.dark}`
  : `${styles.checkBox}`

  return (
    <div className={checkBoxStyle}>

    </div>
  )
}
