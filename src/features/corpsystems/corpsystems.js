import React, { useEffect } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import info from '../../info.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { corpSyst, getSessionKey, getCorpsystem, userData, 
  setBoss, clearForm, getSystemList, processGroupListData, roleListData, rolesData, } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";
import { UserData } from "../userData/userData";
import { Row } from "../components/row/row";
import { SelectInput } from "../components/selectInput/selectInput";
import { Systems } from "./systems/systems";
import { Roles } from "./roles/roles";
import { Approvals } from "./approvals/approvals";
import { setShowInfo, showInfoData, textInfoData } from "./corpsystemsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, } from '@fortawesome/free-solid-svg-icons'

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch  = useDispatch();
  const { lang, api_key, last_name, first_name, 
    middle_name, }        = useSelector(user);
  const dark              = useSelector(darkTheme);
  const load              = useSelector(loading);
  const cs                = useSelector(corpSyst);
  const mainUser          = useSelector(userData);
  const processGroupList  = useSelector(processGroupListData);
  const roleList          = useSelector(roleListData);
  const roles             = useSelector(rolesData);
  const showInfo          = useSelector(showInfoData);
  const textInfo          = useSelector(textInfoData);

  useEffect(() => {
    dispatch(getSessionKey( {'api_key': api_key} ))
    dispatch(getCorpsystem({'url': 'corpsystems', 'path': system, 'api_key': api_key}));
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [api_key, dispatch, system]);

  useEffect(() => {
    if ( cs && cs.asz22_id && cs.instance_type ) 
      // dispatch(getSystemList( {'api_key': api_key, 'asz22_id': cs.asz22_id, 'instance_type': cs.instance_type} ))
      dispatch(getSystemList( {'api_key': api_key, 'asz22_id': cs.asz22_id, 'instance_type': cs.instance_type, 'lang': lang} ))
  // }, [api_key, cs, dispatch]);
  }, [api_key, cs, dispatch, lang]);


  let corpsystemsStyle = dark 
    ? `${styles.corpsystems} ${styles.dark}`
    : `${styles.corpsystems}`

  corpsystemsStyle = cs && cs.instance_type === "TEST" 
    ? `${corpsystemsStyle} ${styles.test}`
    : `${corpsystemsStyle}`


  const onSetBoss = val => {
    if ( !val ) {
      dispatch(clearForm());
    }
    dispatch(setBoss(val))
  };

  return (
    <section className={corpsystemsStyle} >
      <div className={styles.wrapperCS} >
        <TopBar/>
        
        { !load
          ? <form className={styles.form}>
              { cs 
                ? <h3 className={styles.nameForm}>{
                    lang === 'ZH' 
                    ? `${cs.name} ${dictionary.application_for_access_to[lang]}`
                    : `${dictionary.application_for_access_to[lang]} ${cs.name}`
                  }</h3>
                : null
              }

              <div className={styles.aplicantRow}>
                <label>{`${dictionary.applicant[lang]}:`}</label>
                <div className={styles.wrapField}>{`${last_name} ${first_name} ${middle_name} `}</div>
              </div>

              <UserData/>

              { mainUser.id 
                && mainUser.company.hrs01_id 
                && mainUser.branch.hrs05_id 
                && mainUser.department.app22_id 
                && mainUser.position_name 
                && mainUser.email
                ? <>
                    {/* <div className={styles.gapRow}></div> */}
                    <Row>
                      <label>{`${dictionary.user_boss[lang]}`}</label>
                      <div className={styles.wrapField}>
                        <SelectInput
                          selectHandler = { val => onSetBoss(val) }
                          placeholder = {`${dictionary.userNameOlaceholder[lang]}`}
                          val = ''
                          name='bossName'
                          mode = 'boss'
                        />                  
                      </div>
                    </Row>

                    { mainUser.boss
                      ? <>
                          {/* <div className={styles.gapRow}></div> */}
                          <Systems/>

                          { processGroupList.length && roleList.length
                            ? <>
                                <div className={styles.gapRow}></div>
                                <Roles/>

                                { roles.length
                                  ? <>
                                      <div className={styles.gapRow}></div>  
                                      <Approvals/>
                                    </> 
                                  : null
                                }  

                              </>
                            : null
                          }
                        </>
                      : null
                    }
                  </>
                : null
              }
            </form>
          : null
        }
      </div>

      { showInfo
          ? <div className={styles.info}>
              <div className={styles.infoWindow}>

                <div className={styles.textArea}>{info[textInfo][lang]}</div>
                
                <button className={styles.closeInfoBtn}
                  type="buttton"
                  onClick={() => dispatch(setShowInfo(false)) }
                >Got it</button>                
              </div>

          
            </div>
          : null
      }

    </section>
  )
}
