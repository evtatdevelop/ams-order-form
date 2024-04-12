import React, { useEffect } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { corpSyst, getSessionKey, getCorpsystem, userData, 
  setBoss, clearForm, getSystemList, getSubSystemList, } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";
import { UserData } from "../userData/userData";
import { Row } from "../components/row/row";
import { SelectInput } from "../components/selectInput/selectInput";
import { Systems } from "./systems/systems";

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch = useDispatch();
  const {
    lang, api_key, last_name, first_name, middle_name,
  }                       = useSelector(user);
  const dark              = useSelector(darkTheme);
  const load              = useSelector(loading);
  const cs                = useSelector(corpSyst);
  const mainUser          = useSelector(userData);

  useEffect(() => {
    dispatch(getSessionKey( {'api_key': api_key} ))
    dispatch(getCorpsystem({'url': 'corpsystems', 'path': system, 'api_key': api_key}));
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [api_key, dispatch, system]);

  useEffect(() => {
    if ( cs && cs.asz22_id && cs.instance_type ) 
      dispatch(getSystemList( {'api_key': api_key, 'asz22_id': cs.asz22_id, 'instance_type': cs.instance_type} ))
  }, [api_key, cs, dispatch]);

  useEffect(() => {
    if ( cs && cs.sapSystem && Object.keys(cs.sapSystem).length && cs.sapSystem.sub)
      dispatch(getSubSystemList( {'api_key': api_key, 'asz00_id': cs.sapSystem.asz00_id} ))
  }, [api_key, cs, dispatch]);

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
                    <div className={styles.gapRow}></div>
                    <Row>
                      <label>{`${dictionary.user_boss[lang]}`}</label>
                      <div className={styles.wrapField}>
                        <SelectInput  // !other select for boss
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
                          <div className={styles.gapRow}></div>
                          <Systems/>

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
    </section>
  )
}
