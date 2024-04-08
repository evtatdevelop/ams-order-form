import React, { useEffect } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { corpSyst, getSessionKey, getCorpsystem } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";
import { UserData } from "../userData/userData";

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch = useDispatch();
  const {lang, api_key, last_name, first_name, middle_name } = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);
  const cs = useSelector(corpSyst);

  useEffect(() => {
    dispatch(getSessionKey( {'api_key': api_key} ))
    dispatch(getCorpsystem({'url': 'corpsystems', 'path': system, 'api_key': api_key}));
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [api_key, dispatch, system]);

  let corpsystemsStyle = dark 
    ? `${styles.corpsystems} ${styles.dark}`
    : `${styles.corpsystems}`

  corpsystemsStyle = cs && cs.instance_type === "TEST" 
    ? `${corpsystemsStyle} ${styles.test}`
    : `${corpsystemsStyle}`

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

            </form>

          : null
        }
      </div>
    </section>
  )
}
