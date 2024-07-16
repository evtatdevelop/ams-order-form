import React from "react";
import styles from './valueRow.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../main/mainpageSlice";



export const ValueRow = (props) => {
  const {
    // asz05_id,
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


  const codeWith = props.refers[0] === 'value' 
    ? Math.floor(100 / (props.refers[1] + 1)) 
    : Math.floor(100*props.refers[1] / (props.refers[1] + 1));
  const displayCode = props.refers[0] === 'value' && props.refers[1] === 'full' ? 'none' : 'flex';  
  const displayValue = props.refers[0] === 'code' && props.refers[1] === 'full' ? 'none' : 'flex';

  const selectInputStyle = dark 
  ? `${styles.valueRow} ${styles.dark}`
  : `${styles.valueRow}`

  return (
  
    <li className={selectInputStyle}>
      
      <div className={styles.visualCheck}><input type="checkbox"/></div>
      <div className={styles.visualCode} style={{width: `${codeWith}%`, display: `${displayCode}`}}>{code}</div>
      <div className={styles.visualName} style={{display: `${displayValue}`}}>{value}</div>

    </li>
  )
}
