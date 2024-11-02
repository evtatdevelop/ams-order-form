import React, { useEffect } from "react";
import styles from './roles.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../dictionary.json";
import { user } from '.././../user/userSlice';
import { rolesData, showRoleAdder, roleAdderData, paramsData, } from "../corpsystemsSlice";
import { darkTheme } from "../../main/mainpageSlice";
import { AddedRoles } from "./addedRole/addedRole";
import { RoleSandbox } from "./roleSandbox/roleSandbox";

export const Roles = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector(user);
  const roles = useSelector(rolesData);
  const dark = useSelector(darkTheme);
  const roleAdder = useSelector(roleAdderData);

  const {role_buttons_name, role_name, only_one_role} = useSelector(paramsData);
  //! role_buttons_name 

  let rolesStyle = dark 
  ? `${styles.roles} ${styles.dark}`
  : `${styles.roles}`

  useEffect(() => {
    document.getElementById('addRoleForm')?.focus();
  },[])

  return (
    <div className={rolesStyle}>
      <div className={styles.roleRow}>
        <label>{role_name ? role_name : dictionary.roles[lang]}</label>
        <ul className={styles.roleList}>
          { roles.length
            ? roles.map((item, index) => <AddedRoles item = {item} key={index} />)
            : null
          }
          
          { !roles.length || (only_one_role !== '1' && roles.length)
            ? <li><button type="button" className={styles.btnRoleForm} id="addRoleForm"
                onClick={ () => dispatch(showRoleAdder(true)) }
              >{role_name ? `Добавить ${role_name.toLowerCase()}` :dictionary.add_role[lang]}</button></li>
            : null  
          }


        </ul>
      </div>
      
      { roleAdder
        ? <RoleSandbox/>
        : null
      }

    </div>
  )
}
