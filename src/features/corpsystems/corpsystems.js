import React, { useEffect } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { corpSyst, setSystem, getSessionKey, getUserId, userDataLoading, userData, 
  getCompanies, companyListData, setCompany, getBranches, branchListData, 
  getDepartments, departmentLiistData, setBranch, setDepartment, getSapBranch } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";
import { Row } from "../components/row/row";
import { SelectInput } from "../components/selectInput/selectInput";
import { UserDataLoader } from "./userDataLoader";
import { InfoField } from "../components/infoField/infoField";
import Select from "../components/select/select";

export const Corpsystems = () => {
  const { system } = useParams();
  const dispatch = useDispatch();
  const {lang, api_key, last_name, first_name, middle_name } = useSelector(user);
  const dark = useSelector(darkTheme);
  const load = useSelector(loading);
  const cs = useSelector(corpSyst);
  const userDataLoad = useSelector(userDataLoading);
  const userDataList = useSelector(userData);
  const companyList = useSelector(companyListData);
  const branchList = useSelector(branchListData);
  const departmentLiist = useSelector(departmentLiistData);

  useEffect(() => {
    dispatch(getSessionKey( {'api_key': api_key} ))
    dispatch(setSystem(system));
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [api_key, dispatch, system]);

  const corpsystemsStyle = dark 
    ? `${styles.corpsystems} ${styles.dark}`
    : `${styles.corpsystems}`

  useEffect(() => {
    if ( userDataList.company && !Object.keys(userDataList.company).length ) 
      dispatch(getCompanies( {'api_key': api_key, 'company_group': userDataList.company_group} ))
  }, [api_key, dispatch, userDataList.company, userDataList.company_group])

  useEffect(() => {
    if ( userDataList.company && Object.keys(userDataList.company).length ) {
      dispatch(getBranches( {'api_key': api_key, 'hrs01_id': userDataList.company.id} ));     
    }
  }, [api_key, dispatch, userDataList.company])

  useEffect(() => {
    if ( userDataList.branch && Object.keys(userDataList.branch).length ) {
      dispatch(getDepartments( {'api_key': api_key, 'hrs05_id': userDataList.branch.id} ));      
    }
  }, [api_key, dispatch, userDataList.branch])

  useEffect(() => {
    if ( userDataList.department && Object.keys(userDataList.department).length ) {
      dispatch(getSapBranch( {'api_key': api_key, 'app22_id': userDataList.department.id} ));      
    }
  }, [api_key, dispatch, userDataList.department])
    
  const setUser = val => {
    dispatch(getUserId({ 'api_key': api_key, 'app12_id': val }));
  }

  const onWork = val => console.log(val);

  const onSetCompany = val => {
    dispatch(setCompany(val))
  };

  const onSetBranch = val => {
    dispatch(setBranch(val))
  };

  const onSetDepartment = val => {
    dispatch(setDepartment(val))
  };

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
                <div className={styles.wrapField}>{`${last_name} ${first_name} ${middle_name} `}</div>
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
                          { userDataList.company.name
                            ? <InfoField val = {userDataList.company.name} />
                            : <Select
                                selectHandler = { val => onSetCompany(val) }
                                selectClear  = { () => onWork(null) }
                                placeholder = 'Select'
                                selectList = {companyList}
                                val = ''
                                name='companySelect'
                              />
                          }                       
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.branch[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          { userDataList.branch.name
                            ? <InfoField val = {userDataList.branch.name} />
                            : <Select
                                selectHandler = { val => onSetBranch(val) }
                                selectClear  = { () => onWork(null) }
                                placeholder = 'Select'
                                selectList = {branchList}
                                val = ''
                                name='branchSelect'
                              />
                          }      
                        </div>
                      </Row>

                      <Row>
                        <label>{`${dictionary.department[lang]}:`}</label>
                        <div className={styles.wrapField}>
                          { userDataList.department.name
                            ? <InfoField val = {userDataList.department.name} />
                            : <Select
                                selectHandler = { val => onSetDepartment(val) }
                                selectClear  = { () => onWork(null) }
                                placeholder = 'Select'
                                selectList = {departmentLiist}
                                val = ''
                                name='departmenthSelect'
                              />  
                          }
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
                          <InfoField val = {userDataList.sap_branch.name } />                          
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
