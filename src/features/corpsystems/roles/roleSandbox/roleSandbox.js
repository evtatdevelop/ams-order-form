import React, { useState, useEffect, useRef } from "react";
import styles from './roleSandbox.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../../dictionary.json";
import { user } from '../../../user/userSlice';
import { showRoleAdder, processGroupListData, roleListData, getLevels, roleSendboxData,  levelsData, setRole, clearLevels, addRole} from "../../corpsystemsSlice";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/select";
import { darkTheme } from "../../../main/mainpageSlice";
import { InfoField } from "../../../components/infoField/infoField";
import { Levels } from "./levels/levels";

export const RoleSandbox = () => {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const { lang, api_key } = useSelector(user);
  const dark = useSelector(darkTheme);
  const processGroupList = useSelector(processGroupListData);
  const roleList = useSelector(roleListData);
  const role = useSelector(roleSendboxData);
  const levels = useSelector(levelsData);

  const [hereGroups, setHereGroups] = useState([]);
  const [hereRoles, setHereRoles] = useState([]);
  const [hereSearch, setHereSearch] = useState([]);

  useEffect(() => {
    if ( processGroupList.length ) setHereGroups([...processGroupList])
    else setHereGroups([])
  }, [processGroupList]);

  useEffect(() => {
    if ( roleList.length ) setHereRoles( formatRoleNames(roleList) );
    else setHereRoles([])
  }, [roleList]);

  const formatRoleNames = (roleListIn) => [...roleListIn.reduce((summ, item) => [...summ, {...item, name: `${item.name} ( ${item.code} )`}], [])];

  const getGroupById = groupId => processGroupList.find(item => item.id === groupId);

  const getRolesByGroupId = groupId => roleList.filter(item => item.proccss_group_id === groupId);

  const handleGroup = val => {
    dispatch(setRole({...role, processGroup: val}));
    setHereRoles( formatRoleNames(getRolesByGroupId(val.id)) );
    dispatch(setRole({}));
    dispatch(clearLevels());
  }

  const handleRole = val => {
    const group = getGroupById(val.proccss_group_id);
    dispatch(setRole({processGroup: group, role: val}));
    setHereGroups([group]);

    dispatch(getLevels({
      api_key,
      lang,
      asz03_id: val.id,  
    }));
  }

  const cancelGroup = () => {
    setHereRoles( formatRoleNames(roleList) );
    dispatch(setRole({}));
    dispatch(clearLevels());
  }

  const cancelRole = () => {
    setHereGroups([...processGroupList]);
    dispatch(setRole({}));
    dispatch(clearLevels());
  }

  const searchRole = str => {
    if ( !str ) {
      setHereSearch([]);
      return
    }
    setHereSearch([
      ...roleList.filter(role => role.name.toUpperCase().includes(str.toUpperCase()) || role.code.includes(str.toUpperCase())),
      ...processGroupList.filter(roup => roup.name.toUpperCase().includes(str.toUpperCase())),
    ]);
  }

  const searchChoice = item => {
    if ( item.code ) {
      handleRole(item)
      setHereRoles([item]);
    } else { 
      handleGroup( item );
      setHereGroups([item]);
    }
    setHereSearch([]);
    if ( searchRef.current ) searchRef.current.clearInput();
  }

  // ? test function. Requires development
  const checkRole = role => {
    console.log(role);
    return true;
  }

  const handleOk = () => {
    if ( !checkRole(role) ) return;
    dispatch(addRole(role));
    dispatch(showRoleAdder(false));
    cancelRole();
    dispatch(clearLevels());
  }

  const handleCancel = () => {
    dispatch(showRoleAdder(false));
    dispatch(setRole({}));
    dispatch(clearLevels());
  }

  let roleSandboxStyle = dark
  ? `${styles.roleSandbox} ${styles.dark}`
  : `${styles.roleSandbox}`

  return (
    <section className={roleSandboxStyle}>
      <div className={styles.oneRoleSandbox}>
        <div className={styles.roleData}>
          <Input 
            inputHandler = { val => searchRole(val) }
            inputClear = { () => {} }
            placeholder = {dictionary.search[lang]}
            val = ''
            ref={searchRef} 
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
            : <InfoField val = { hereGroups.length ? hereGroups[0].name : null } />                          
          }
          
          { hereRoles.length > 1
            ? <Select
                selectHandler = { val => handleRole(val) }
                selectClear  = { () => cancelRole() }
                placeholder = {dictionary.nameRole[lang]}
                selectList = {hereRoles}
                val = ''
                name='roles'
              />
            : <InfoField val = { hereRoles.length ? hereRoles[0].name : null } />
          }

          { hereSearch.length
            ? <ul className={styles.searhResult}>
                { hereSearch.map((item, index) => <li key={index} className={styles.serchItem}>
                    <button type="button"
                      onClick={()=>searchChoice(item)}
                    >
                      <div className={styles.label}>{`${item.code ? dictionary.nameRole[lang]: dictionary.nameProcessGroup[lang]}:`}</div>
                      <div className={styles.name}>{`${item.name}`}
                        { item.code ? <span className={styles.code}>{` (${item.code} )`}</span> : null } 
                      </div>
                      
                    </button>
                  </li>
                )}
              </ul>
            : null
          }

          { levels.length
            ? <Levels/>
            : null
          }
        </div>

        <div className={styles.control}>
          <button type="button" onClick={ () => handleOk(true) }>{dictionary.save[lang]}</button>
          <button type="button" onClick={ () => handleCancel(true) }>{dictionary.cancel[lang]}</button>
        </div>
      </div>
    </section>
  )
}
