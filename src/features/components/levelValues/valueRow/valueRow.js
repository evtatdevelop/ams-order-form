import React from "react";
import styles from './valueRow.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../main/mainpageSlice";



export const ValueRow = (props) => {
  const {
    asz05_id,
    code,
    // code_parent,
    // code_value,
    // display_type,
    // id,
    // multiple_select,
    // name,
    // orglevels_order,
    value
  } = props.item;

  const dark = useSelector(darkTheme);


  const selectInputStyle = dark 
  ? `${styles.valueRow} ${styles.dark}`
  : `${styles.valueRow}`

  return (
  
    <li className={selectInputStyle}>
      <div className={styles.visualCheck}>{asz05_id}</div>
      <div className={styles.visualCode}>{code}</div>
      <div className={styles.visualName}>{value}</div>

    </li>
  )
}
