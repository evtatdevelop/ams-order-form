import React, { useState, useEffect, useRef } from "react";
import styles from './roleSandbox.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../../dictionary.json";
import { user } from '../../../user/userSlice';
import { showRoleAdder, processGroupListData, roleListData, getLevels, roleSendboxData, 
  levelsData, setRole, clearLevels, addRole, rolesData, clearLevelValues, processLevel, sessionKeyData, cancelEdit } from "../../corpsystemsSlice";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/select";
import { darkTheme } from "../../../main/mainpageSlice";
import { InfoField } from "../../../components/infoField/infoField";
import { Levels } from "./levels/levels";

import { DateInterval } from "./dateInterval/dateInterval";

export const RoleSandbox = () => {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const { lang, api_key } = useSelector(user);
  const dark = useSelector(darkTheme);
  const processGroupList = useSelector(processGroupListData);
  const roleList = useSelector(roleListData);
  const role = useSelector(roleSendboxData);
  const levels = useSelector(levelsData);
  const sessionKey = useSelector(sessionKeyData);

  const [hereSearch, setHereSearch] = useState([]);
  const [hereGroups, setHereGroups] = useState([]);
  const [hereRoles, setHereRoles] = useState([]);
  
  const [hereGroup, setHereGroup] = useState('');
  const [hereRole, setHereRole] = useState('');
  
  
  const roles = useSelector(rolesData);
  const [cnt, ] = useState(roles.length ? roles[roles.length-1].cnt+1 : 1);

  useEffect(() => {
    if ( Object.keys(role).length ) {
      setHereGroup(role.processGroup.name);
      setHereRole(`${role.role.name} ( ${role.role.code} )`)
      dispatch(getLevels({
        api_key,
        lang,
        asz03_id: role.role.id,  
      }));      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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
    dispatch(setRole({cnt: cnt, ...role, processGroup: val, }));
    setHereRoles( formatRoleNames(getRolesByGroupId(val.id)) );
    dispatch(setRole({}));
    dispatch(clearLevels());
  }

  const handleRole = val => {
    
    //? Re:formatRoleNames
    const role = {...val, name: val.name.slice(0, val.name.lastIndexOf('(', val.length)).trim(), }
    const group = getGroupById(val.proccss_group_id);
    dispatch(setRole({cnt: cnt, processGroup: group, role, }));
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

  const clearSerch = () => {
    setHereSearch([]);
  }

  const clearLevel = asz05_id => {    
    const getRmList = function(asz05_id) {
      const childrenId = levels.filter(level => level.parent === asz05_id ).map(level => level.asz05_id);
      const value = (role.levels.find(lvl => lvl.asz05_id === asz05_id))?.value;
      if ( value?.length ) rmValues = [...rmValues, ...value];
      dispatch(clearLevelValues({asz05_id }));                    //? remove from sandBox
      if ( childrenId.length ) childrenId.map(child => getRmList(child));
    }
    let rmValues = [];
    getRmList(asz05_id);                                          //? remove from DB
    if ( rmValues.length ) dispatch(processLevel({api_key, removed: rmValues, event: 'rmSessionLevels', session_key: sessionKey, blk_id: role.cnt, asz03_id: role.role.id, asz05_id, }));
  } 


  // ? test function. Requires development
  const checkRole = role => {
    //todo: checking the consistency of the lists of level values ​​with each other

    if ( !role?.role?.id ) return false; 
    if ( role.levels && (!role.levels.length || levels.length !== role.levels.length) ) return false;

    return true;
  }

  const handleOk = () => {
    if ( !checkRole(role) ) return;
    dispatch(addRole(role));
    dispatch(showRoleAdder(false));
    cancelRole();
    dispatch(clearLevels());
    dispatch(cancelEdit());
  }

  const handleCancel = () => {
    dispatch(showRoleAdder(false));
    dispatch(setRole({}));
    dispatch(clearLevels());
    dispatch(cancelEdit());
  }

  let roleSandboxStyle = dark
  ? `${styles.roleSandbox} ${styles.dark}`
  : `${styles.roleSandbox}`


  return (
    <section className={roleSandboxStyle}>
      <div className={styles.oneRoleSandbox}>
        <div className={styles.roleData}>
          { !Object.keys(role).length
            ? <Input 
                inputHandler = { val => searchRole(val) }
                inputClear = { () => clearSerch() }
                placeholder = {dictionary.search[lang]}
                val = ''
                ref={searchRef} 
              />
            : <div className={styles.searchBlank}></div>
          }
          <div className={styles.gapRow}></div>

          { hereGroups.length > 1
            ? <Select
                selectHandler = { val => handleGroup(val) }
                selectClear  = { () => cancelGroup() }
                placeholder = {dictionary.nameProcessGroup[lang]}
                selectList = {hereGroups}
                val = {hereGroup}
                name=''
              />
            : <InfoField val = { hereGroups.length ? hereGroups[0].name : null } />                          
          }
          <div className={styles.gapRow}></div>
          
          { hereRoles.length > 1
            ? <Select
                selectHandler = { val => handleRole(val) }
                selectClear  = { () => cancelRole() }
                placeholder = {dictionary.nameRole[lang]}
                selectList = {hereRoles}
                val = {hereRole}
                name=''
              />
            : <InfoField val = { hereRoles.length ? hereRoles[0].name : null } />
          }
          <div className={styles.gapRow}></div>

          { hereSearch.length
            ? <ul className={styles.searhResult}>
                { hereSearch.map((item, index) => <li key={index} className={styles.serchItem}>
                    <button type="button"
                      onClick={()=>searchChoice(item)}
                    >
                      <div className={styles.label}>{`${item.code ? dictionary.nameRole[lang]: dictionary.nameProcessGroup[lang]}:`}</div>
                      <div className={styles.name}>{`${item.name}`}
                        { item.code ? <span className={styles.code}>{` (${item.code} ) ${item.proccss_group_name ? ` [ ${item.proccss_group_name} ]` : null}`}</span> : null } 
                      </div>
                      
                    </button>
                  </li>
                )}
              </ul>
            : null
          }

          { levels.length
            ? <Levels clearLevel={clearLevel} />
            : null
          }

          { role.levels?.length === levels?.length
            // ? <div className={styles.timeInterval}>
            //     <InputDate
            //         dateHandler = { val => console.log(val) }
            //         lang = {lang}
            //     />
            //     <InputDate
            //         dateHandler = { val => console.log(val) }
            //         lang = {lang}
            //     />
            //   </div>
            ? <DateInterval/>  
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
