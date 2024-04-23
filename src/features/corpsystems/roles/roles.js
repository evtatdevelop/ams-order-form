import React, { useState, useEffect } from "react";
import styles from './roles.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../dictionary.json";
import { user } from '.././../user/userSlice';
import { rolesData, processGroupListData, roleListData, addRole } from "../corpsystemsSlice";
import { Row } from "../../components/row/row";
import Input from "../../components/input/Input";
import Select from "../../components/select/select";
import { darkTheme } from "../../main/mainpageSlice";
import { InfoField } from "../../components/infoField/infoField";

export const Roles = () => {
  
  const dispatch = useDispatch();
  const { lang } = useSelector(user);
  const roles = useSelector(rolesData);
  const dark = useSelector(darkTheme);
  const processGroupList = useSelector(processGroupListData);
  const roleList = useSelector(roleListData);
  
  const [role, setRole] = useState({});
  const [roleAdder, showRoleAdder] = useState(false);
  const [hereGroups, setHereGroups] = useState([]);
  const [hereRoles, setHereRoles] = useState([]);

  const getGroupById = groupId => processGroupList.find(item => item.id === groupId);
  const getRolesByGroupId = groupId => roleList.filter(item => item.proccss_group_id === groupId );

  const handleGroup = val => {
    setRole({...role, processGroup: val});
    setHereRoles(getRolesByGroupId(val.id));
  }
  const handleRole = val => {
    const group = getGroupById(val.proccss_group_id);
    setRole({processGroup: group, role: val});
    setHereGroups([group]);
  }
  const cancelGroup = () => {
    setHereRoles([...roleList.reduce((summ, item) => [...summ, {...item, name: `${item.name} ( ${item.code} )`}], [])]);
    setRole({})
  }
  const cancelRole = () => {
    setHereGroups([...processGroupList]);
    setRole({});
  }

  const handleOk = () => {
    dispatch(addRole(role));
    showRoleAdder(false);
  }
  const handleCancel = () => {
    showRoleAdder(false);
  }

  useEffect(() => {
    if ( processGroupList.length ) setHereGroups([...processGroupList])
    else setHereGroups([])
  }, [processGroupList]);

  useEffect(() => {
    if ( roleList.length ) {
      setHereRoles([
        ...roleList.reduce((summ, item) => [...summ, {...item, name: `${item.name} ( ${item.code} )`}], [])
      ])
    }
    else setHereRoles([])
  }, [roleList]);




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
                { hereGroups.length > 1
                  ? <Select
                      selectHandler = { val => handleGroup(val) }
                      selectClear  = { () => cancelGroup() }
                      placeholder = {dictionary.nameProcessGroup[lang]}
                      selectList = {hereGroups}
                      val = ''
                      name='processGroups'
                    />
                  : <InfoField val = {hereGroups[0].name} />                          
                }
                
                <Select
                  selectHandler = { val => handleRole(val) }
                  selectClear  = { () => cancelRole() }
                  placeholder = {dictionary.nameRole[lang]}
                  selectList = {hereRoles}
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
