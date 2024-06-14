import React, { useState } from "react";
import styles from './roles.module.scss';
import { useSelector, useDispatch } from "react-redux";
import dictionary from "../../../dictionary.json";
import { user } from '.././../user/userSlice';
import { rolesData, clearLevels, addRole, roleSendboxData, setRole } from "../corpsystemsSlice";
// import Input from "../../components/input/Input";
// import Select from "../../components/select/select";
import { darkTheme } from "../../main/mainpageSlice";
// import { InfoField } from "../../components/infoField/infoField";
import { AddedRoles } from "./addedRole/addedRole";
// import { WindowInput } from "../../components/windowInput/windowInput";
// import { getContractorsData } from "../corpsystemsSliceAPI";
import { RoleSandbox } from "../roleSandbox/roleSandbox";

export const Roles = () => {
  // const searchRef = useRef(null);
  const dispatch = useDispatch();
  const { lang } = useSelector(user);
  const roles = useSelector(rolesData);
  const dark = useSelector(darkTheme);

  const role = useSelector(roleSendboxData);

  // const processGroupList = useSelector(processGroupListData);
  // const roleList = useSelector(roleListData);
  // const levels = useSelector(levelsData);
  
  // const [role, setRole] = useState({});
  const [roleAdder, showRoleAdder] = useState(false);
  // const [hereGroups, setHereGroups] = useState([]);
  // const [hereRoles, setHereRoles] = useState([]);
  // const [hereSearch, setHereSearch] = useState([]);


  // useEffect(() => {
  //   if ( processGroupList.length ) setHereGroups([...processGroupList])
  //   else setHereGroups([])
  // }, [processGroupList]);

  // useEffect(() => {
  //   if ( roleList.length ) {
  //     setHereRoles( formatRoleNames(roleList) );
  //   }
  //   else setHereRoles([])
  // }, [roleList]);

  // const formatRoleNames = (roleListIn) => [...roleListIn.reduce((summ, item) => [...summ, {...item, name: `${item.name} ( ${item.code} )`}], [])];

  // const getGroupById = groupId => processGroupList.find(item => item.id === groupId);
  // const getRolesByGroupId = groupId => roleList.filter(item => item.proccss_group_id === groupId);

  // const handleGroup = val => {
  //   setRole({...role, processGroup: val});
  //   setHereRoles( formatRoleNames(getRolesByGroupId(val.id)) );
  //   setRole({});
  //   dispatch(clearLevels());
  //   //? добавить очистку роли через ref
  // }
  // const handleRole = val => {
  //   const group = getGroupById(val.proccss_group_id);
  //   setRole({processGroup: group, role: val});
  //   setHereGroups([group]);

  //   dispatch(getLevels({
  //     api_key,
  //     lang,
  //     asz03_id: val.id,  
  //   }));
  // }
  // const cancelGroup = () => {
  //   setHereRoles( formatRoleNames(roleList) );
  //   setRole({});
  //   dispatch(clearLevels());
  //   //? добавить очистку роли через ref
  // }
  const cancelRole = () => {
    // setHereGroups([...processGroupList]);
    dispatch(setRole({}));
    dispatch(clearLevels());
  }



  // ? test function. Requires development
  const checkRole = role => {
    // if ( Object.keys(role).length && role.role?.name && role.role?.code ) return true;
    // return false;
    return true;
  }

  const handleOk = () => {
    if ( !checkRole(role) ) return;
    dispatch(addRole(role));
    showRoleAdder(false);
    // setHereGroups([...processGroupList]);
    // setHereRoles( formatRoleNames(roleList) );
    cancelRole();
    dispatch(clearLevels());
  }

  const handleCancel = () => {
    // setHereGroups([...processGroupList]);
    // setHereRoles( formatRoleNames(roleList) );
    showRoleAdder(false);
    // setHereSearch([]);
    dispatch(setRole({}));
    dispatch(clearLevels());
  }

  // const searchRole = str => {
  //   if ( !str ) {
  //     setHereSearch([]);
  //     return
  //   }
  //   setHereSearch([
  //     ...roleList.filter(role => role.name.toUpperCase().includes(str.toUpperCase()) || role.code.includes(str.toUpperCase())),
  //     ...processGroupList.filter(roup => roup.name.toUpperCase().includes(str.toUpperCase())),
  //   ]);
  // }

  // const searchChoice = item => {
  //   if ( item.code ) {
  //     handleRole(item)
  //     setHereRoles([item]);
  //   } else { 
  //     handleGroup( item );
  //     setHereGroups([item]);
  //   }
  //   setHereSearch([]);
  //   if ( searchRef.current ) searchRef.current.clearInput();
  // }

  let rolesStyle = dark 
  ? `${styles.roles} ${styles.dark}`
  : `${styles.roles}`

  return (
    <div className={rolesStyle}>
      <div className={styles.roleRow}>
        <label>{dictionary.roles[lang]}</label>
        <ul className={styles.roleList}>
          { roles.length
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
              <RoleSandbox/>
              {/* <div className={styles.roleData}>
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
                  : <InfoField val = {hereGroups[0].name} />                          
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
                  : <InfoField val = {hereRoles[0].name} />
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
                  ? <ul>
                      { levels.map((item, index) => <li key={index}>

                      <WindowInput 
                        inputHandler = { val => console.log(val) }
                        placeholder = {item.name}
                        winContentFunc = {getContractorsData}
                        content = {contractorList}
                        search = {['name', 'inn']}
                      />
                      </li>)}
                    </ul>
                  : null

                }

              </div> */}

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


// const contractorList = (value) => 
//   <div className={styles.contractors}>
//     <div className={styles.list}>
//       {value.data ? value.data.map(item => <div key={item.id} itemID={item.id}>{`${item.name} (${item.inn})`}</div>) : null}
//     </div>
//   </div>