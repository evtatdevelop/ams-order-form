import React from "react";
import styles from './addedRole.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { editRole, processLevel, sessionKeyData, } from "../../corpsystemsSlice";
import { darkTheme } from "../../../main/mainpageSlice";
import { user } from "../../../user/userSlice";

export const AddedRoles = props => {

  const {item} = props;
  const { api_key, } = useSelector(user);
  const dispatch = useDispatch();
  const dark = useSelector(darkTheme);
  const sessionKey = useSelector(sessionKeyData);

  const removeRole = () => {
    // dispatch(rmRole(item.role.id))
    dispatch(processLevel({api_key, event: 'rmSessionRole', session_key: sessionKey, blk_id: item.cnt, }));
  }

  const viewRole = () => {
    // console.log('view / modify', item)
    dispatch(editRole(item))
  }

  let addedRolesStyle = dark 
  ? `${styles.addedRole} ${styles.dark}`
  : `${styles.addedRole}`

  return (
    <li className={addedRolesStyle}>
      <button type="button" className={styles.header}
        onClick={() => viewRole() }
      >{`${item.role.name} ( ${item.role.code} )`}</button>
      <button type="button" className={styles.remove}
        onClick={() => removeRole()}
      >&times;</button>
    </li>
  )
}
