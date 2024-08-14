import React from "react";
import styles from './addedRole.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { rmRole } from "../../corpsystemsSlice";

import { darkTheme } from "../../../main/mainpageSlice";

export const AddedRoles = props => {

  const {item} = props;
  const dispatch = useDispatch();
  const dark = useSelector(darkTheme);

  let addedRolesStyle = dark 
  ? `${styles.addedRole} ${styles.dark}`
  : `${styles.addedRole}`

  //! Important
  //toDo: call rmSessionRole
  

  return (
    <li className={addedRolesStyle}>
      <button type="button" className={styles.header}>{`${item.role.name} ( ${item.role.code} )`}</button>
      <button type="button" className={styles.remove}
        onClick={() => dispatch(rmRole(item.role.id))}
      >&times;</button>
    </li>
  )
}
