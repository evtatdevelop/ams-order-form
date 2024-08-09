import React, { useState, useEffect, useRef } from "react";
import styles from './roleSandbox.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../../dictionary.json";
import { user } from '../../../user/userSlice';
import { showRoleAdder, processGroupListData, roleListData, getLevels, roleSendboxData, 
  levelsData, setRole, clearLevels, addRole, rolesData, clearLevelValues, processLevel, sessionKeyData, } from "../../corpsystemsSlice";
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
  const sessionKey = useSelector(sessionKeyData);

  const [hereSearch, setHereSearch] = useState([]);
  const [hereGroups, setHereGroups] = useState([]);
  const [hereRoles, setHereRoles] = useState([]);
  
  const roles = useSelector(rolesData);
  const [cnt, ] = useState(roles.length ? roles[roles.length-1].cnt+1 : 1);

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
    // dispatch(setRole({cnt: cnt, ...role, processGroup: val, levels: []}));
    dispatch(setRole({cnt: cnt, ...role, processGroup: val, }));
    setHereRoles( formatRoleNames(getRolesByGroupId(val.id)) );
    dispatch(setRole({}));
    dispatch(clearLevels());
  }

  const handleRole = val => {
    //? Re:formatRoleNames
    // val.name = val.name.slice(0, val.name.lastIndexOf('(', val.length)).trim();
    const role = {
      ...val,
      name: val.name.slice(0, val.name.lastIndexOf('(', val.length)).trim(),
    }

    const group = getGroupById(val.proccss_group_id);
    // dispatch(setRole({cnt: cnt, processGroup: group, role: val, levels: []}));
    // dispatch(setRole({cnt: cnt, processGroup: group, role, levels: []}));
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
    console.log('role', role);
    
    if ( !role?.role?.id ) return false;
    
    //todo: check filing of levels 
    if ( role.levels && !role.levels.length ) return false;

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

  // console.log(hereSearch)

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
        </div>

        <div className={styles.control}>
          <button type="button" onClick={ () => handleOk(true) }>{dictionary.save[lang]}</button>
          <button type="button" onClick={ () => handleCancel(true) }>{dictionary.cancel[lang]}</button>
        </div>
      </div>
    </section>
  )
}
