import React, { useEffect } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { corpSyst, setSystem, getSessionKey, getUserId, userDataLoading, userData } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";
import { Row } from "../components/row/row";
import { SelectInput } from "../components/selectInput/selectInput";
import { UserDataLoader } from "./userDataLoader";
import { InfoField } from "../components/infoField/infoField";

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch = useDispatch();
  const {lang, api_key, given_name} = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);
  const cs = useSelector(corpSyst);
  const userDataLoad = useSelector(userDataLoading);
  const userDataList = useSelector(userData);

  useEffect(() => {
    dispatch(getSessionKey( {'api_key': api_key} ))
    dispatch(setSystem(system));
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [api_key, dispatch, system]);

  const corpsystemsStyle = dark 
    ? `${styles.corpsystems} ${styles.dark}`
    : `${styles.corpsystems}`

  const setUser = val => dispatch(getUserId({ 'api_key': api_key, 'app12_id': val }));

  return (
    <section className={corpsystemsStyle} >
      <div className={styles.wrapperCS} >
        <TopBar/>
        { !load
          ? <form className={styles.form}>
              { cs 
                ? <h3 className={styles.nameForm}>{`${dictionary.application_for_access_to[lang]} ${cs.toUpperCase()}`}</h3>
                : null
              }

              <div className={styles.aplicantRow}>
                <label>{`${dictionary.applicant[lang]}:`}</label>
                <div className={styles.wrapField}>{`${given_name}`}</div>
              </div>

              <Row>
                <label>{`${dictionary.userName[lang]}:`}</label>
                <div className={styles.wrapField}>
                  <SelectInput
                    selectHandler = { val => setUser(val) }
                    placeholder = {`${dictionary.userNameOlaceholder[lang]}`}
                    val = ''
                    name='userName'
                  />                  
                </div>
              </Row>

              
              <div className={styles.userData}>
                { userDataLoad
                  ? <div className={styles.userDataLoader}>
                      <UserDataLoader/>
                    </div>
                  : null
                }  
                  
                { userDataList.id 
                  ? <div className={styles.userDataList}>
                      <Row>
                        <label>{`${dictionary.email[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = {userDataList.email} />                          
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.ad_account[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = {userDataList.ad_user} />                          
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.company[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = {userDataList.main_subdivision_name} />                          
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.branch[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = {userDataList.region} />                          
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.department[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = {userDataList.div_name} />                          
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.position[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = {userDataList.position_name} />                          
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.location[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = {userDataList.location } />                          
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.sap_branch[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          <InfoField val = '&nbsp;' />                          
                        </div>
                      </Row>

                    </div>
                  : null  
                }
              </div>
              

            </form>

          : null
        }
      </div>
    </section>
  )
}
