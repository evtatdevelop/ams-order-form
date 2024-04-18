import React, { useState } from "react";
import styles from './roles.module.scss';
import { useSelector } from "react-redux";
import dictionary from "../../../dictionary.json";
import { user } from '.././../user/userSlice';
import { rolesData } from "../corpsystemsSlice";
import { Row } from "../../components/row/row";
import Input from "../../components/input/Input";
import Select from "../../components/select/select";
import { darkTheme } from "../../main/mainpageSlice";

export const Roles = () => {
  const { lang } = useSelector(user);
  const roles = useSelector(rolesData);
  const dark = useSelector(darkTheme);
  
  const [roleAdder, showRoleAdder] = useState(false);
  const handleOk = () => {
    showRoleAdder(false);
  }
  const handleCancel = () => {
    showRoleAdder(false);
  }

  let rolesStyle = dark 
  ? `${styles.roles} ${styles.dark}`
  : `${styles.roles}`

  return (
    <div className={rolesStyle}>
      <Row className={styles.roleRow}>
        <label>{dictionary.roles[lang]}</label>
        <ul className={styles.roleList}>
          { roles.length
            ? roles.map((item, index) => console.log(index, item))
            : null
          }
          <li><button type="button" className={styles.btnRoleForm}
            onClick={ () => showRoleAdder(true) }
          >{dictionary.add_role[lang]}</button></li> 
        </ul>
      </Row>
      
      { roleAdder
        ? <section className={styles.roleAdder}>
            <div className={styles.oneRoleSandbox}>
              <div className={styles.roleData}>
                <Input 
                  inputHandler = { val => console.log(val) }
                  inputClear = { () => {} }
                  placeholder = {dictionary.search[lang]}
                  val = ''
                />
                <Select
                  selectHandler = { val => console.log(val) }
                  selectClear  = { val => console.log(null) }
                  placeholder = {dictionary.nameProcessGroup[lang]}
                  selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, {'id':4, 'name': 'four'}, {'id':5, 'name': 'five'}, {'id':6, 'name': 'six'}, {'id':7, 'name': 'seven'}, {'id':8, 'name': 'eight'}, ]}
                  val = ''
                  name='processGroups'
                />
                <Select
                  selectHandler = { val => console.log(val) }
                  selectClear  = { val => console.log(null) }
                  placeholder = {dictionary.nameRole[lang]}
                  selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, {'id':4, 'name': 'four'}, {'id':5, 'name': 'five'}, {'id':6, 'name': 'six'}, {'id':7, 'name': 'seven'}, {'id':8, 'name': 'eight'}, ]}
                  val = ''
                  name='roles'
                />

              </div>

              <div className={styles.control}>
                <button type="button" onClick={ () => handleOk(true) }>{dictionary.save[lang]}</button>
                <button type="button" onClick={ () => handleCancel(true) }>{dictionary.cancel[lang]}</button>
              </div>
            </div>
          </section>
        : null
      }

   
    </div>
  
  )
}
