import React from "react";
import styles from './valueRow.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../main/mainpageSlice";
import { CheckBox } from "./checkBox/checkBox";



export const ValueRow = (props) => {
  const {
    // asz05_id,
    code,
    // code_parent,
    // code_value,
    // display_type,
    id,
    // multiple_select,
    // name,
    // orglevels_order,
    value,
  } = props.item;

  const checkUncheck = () => {
    props.setCheck( id )
  }

  // if ( props.incomplete ) console.log(code);
  

  const dark = useSelector(darkTheme);

  const codeWith = props.refers[0] === 'value' 
    ? Math.floor(100 / (props.refers[1] + 1)) 
    : Math.floor(100*props.refers[1] / (props.refers[1] + 1));
  const displayCode = props.refers[0] === 'value' && props.refers[1] === 'full' ? 'none' : 'flex';  
  const displayValue = props.refers[0] === 'code' && props.refers[1] === 'full' ? 'none' : 'flex';

  const selectvalueRow = dark 
  ? `${styles.valueRow} ${styles.dark}`
  : `${styles.valueRow}`

  const wrapperBtnStyle = (props.incomplete || props.notOptimal) && !props.check
  ? `${styles.wrapperBtn} ${styles.incomplete}`
  : `${styles.wrapperBtn}`

  return (
    <li className={selectvalueRow}>
      <button type="button" className={wrapperBtnStyle} onClick={ () => checkUncheck() } >
        <div className={styles.visualCheck}><CheckBox check = { props.check }/></div>
        <div className={styles.visualCode} style={{width: `${codeWith}%`, display: `${displayCode}`}}>{code}</div>
        <div className={styles.visualName} style={{display: `${displayValue}`}}>{value}</div>
      </button>
    </li>
  )
}
