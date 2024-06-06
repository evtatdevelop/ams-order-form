import React, { useState, useEffect } from "react";
import styles from './roles.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../dictionary.json";
import { user } from '.././../user/userSlice';
import { rolesData, processGroupListData, roleListData, addRole } from "../corpsystemsSlice";
import Input from "../../components/input/Input";
import Select from "../../components/select/select";
import { darkTheme } from "../../main/mainpageSlice";
import { InfoField } from "../../components/infoField/infoField";
import { AddedRoles } from "./addedRole/addedRole";

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

  const formatRoleNames = (roleListIn) => [...roleListIn.reduce((summ, item) => [...summ, {...item, name: `${item.name} ( ${item.code} )`}], [])];

  const getGroupById = groupId => processGroupList.find(item => item.id === groupId);
  const getRolesByGroupId = groupId => roleList.filter(item => item.proccss_group_id === groupId);

  const handleGroup = val => {
    setRole({...role, processGroup: val});
    setHereRoles( formatRoleNames(getRolesByGroupId(val.id)) );
  }
  const handleRole = val => {
    const group = getGroupById(val.proccss_group_id);
    setRole({processGroup: group, role: val});
    setHereGroups([group]);
  }
  const cancelGroup = () => {
    setHereRoles( formatRoleNames(roleList) );
    setRole({})
  }
  const cancelRole = () => {
    setHereGroups([...processGroupList]);
    setRole({});
  }

  // ! test function. Requires development
  const checkRole = role => {
    if ( Object.keys(role).length && role.role?.name && role.role?.code ) return true;
    return false;
  }

  const handleOk = () => {
    if ( !checkRole(role) ) return;
    console.log(role);
    dispatch(addRole(role));
    showRoleAdder(false);
    setHereGroups([...processGroupList]);
    setHereRoles( formatRoleNames(roleList) );
    cancelRole();
  }
  const handleCancel = () => {
    setHereGroups([...processGroupList]);
    setHereRoles( formatRoleNames(roleList) );
    showRoleAdder(false);
  }

  useEffect(() => {
    if ( processGroupList.length ) setHereGroups([...processGroupList])
    else setHereGroups([])
  }, [processGroupList]);

  useEffect(() => {
    if ( roleList.length ) {
      setHereRoles( formatRoleNames(roleList) );
    }
    else setHereRoles([])
  }, [roleList]);

  let rolesStyle = dark 
  ? `${styles.roles} ${styles.dark}`
  : `${styles.roles}`

  return (
    <div className={rolesStyle}>
      <div className={styles.roleRow}>
        <label>{dictionary.roles[lang]}</label>
        <ul className={styles.roleList}>
          { roles.length
            // ? roles.map((item, index) => <li key={index}>{`${item.role.name} ( ${item.role.code} )`}</li>)
            ? roles.map((item, index) => <AddedRoles item = {item} key={index} />)
            : null
          }
          <li><button type="button" className={styles.btnRoleForm}
            onClick={ () => showRoleAdder(true) }
          >{dictionary.add_role[lang]}</button></li> 
        </ul>
      </div>
      
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
