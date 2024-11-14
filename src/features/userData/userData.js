import React, { useEffect, useState } from "react";
import styles from './userData.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import { getUserId, userDataLoading, userData, 
  getCompanies, companyListData, setCompany, getBranches, branchListData, locationLiistData, positionInputData,
  getDepartments, departmentLiistData, setBranch, setDepartment, getSapBranch, getLocations, setLocation, setPosition,
  unSetSapBranch, unsetDepartmentList, unsetBrancList, unsetCompanyList, unsetLocationList, unSetPosition, clearForm, clearApprovals, hintsData } from "../corpsystems/corpsystemsSlice";
import { Row } from "../components/row/row";
import { SelectInput } from "../components/selectInput/selectInput";
import { UserDataLoader } from "./userDataLoader";
import { InfoField } from "../components/infoField/infoField";
import Select from "../components/select/select";
import Input from "../components/input/Input";
import SelectTree from "../components/selectTree/selectTree";
import { darkTheme } from "../main/mainpageSlice";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark, } from '@fortawesome/free-solid-svg-icons'
import { Hint } from "../components/hint/hint";
import { RowHint } from "../components/rowHint/rowHint";

export const UserData = props => {

  const { removeSession } = props;

  const dispatch = useDispatch();
  
  const dark = useSelector(darkTheme);
  const {lang, api_key } = useSelector(user);
  const userDataLoad = useSelector(userDataLoading);
  const userDataList = useSelector(userData);
  const companyList = useSelector(companyListData);
  const branchList = useSelector(branchListData);
  const departmentLiist = useSelector(departmentLiistData);
  const locationLiist = useSelector(locationLiistData);
  const positionInput = useSelector(positionInputData);
  // const hints = useSelector(hintsData);


  useEffect(() => {
    document.getElementById('oredrUser')?.focus();
  },[])
  useEffect(() => { 
    if ( !userDataList.boss && 
      Object.keys(userDataList).length && userDataList.company && Object.keys(userDataList.company)?.length
      && userDataList.branch && Object.keys(userDataList.branch)?.length
      && userDataList.department && Object.keys(userDataList.department)?.length
      && userDataList.position_name 
      && userDataList.email
    ) document.getElementById('oredrBoss')?.focus();
  },[userDataList])

  useEffect(() => {
    if ( userDataList.company && !Object.keys(userDataList.company).length ) 
      dispatch(getCompanies( {'api_key': api_key, 'company_group': userDataList.company_group} ))
  }, [api_key, dispatch, userDataList.company, userDataList.company_group])

  useEffect(() => {
    if ( userDataList.company && Object.keys(userDataList.company).length 
          && userDataList.branch && !Object.keys(userDataList.branch).length) {
      dispatch(getBranches( {'api_key': api_key, 'hrs01_id': userDataList.company.hrs01_id} ));     
    }
  }, [api_key, dispatch, userDataList.branch, userDataList.company])

  useEffect(() => {
    if ( userDataList.branch && Object.keys(userDataList.branch).length 
          && userDataList.department && !Object.keys(userDataList.department).length) {
      dispatch(getDepartments( {'api_key': api_key, 'hrs05_id': userDataList.branch.hrs05_id} ));  
      
      if ( !userDataList.location ) {
        dispatch(getLocations( {'api_key': api_key, 'hrs05_id': userDataList.branch.hrs05_id} ));      
      }
    }
  }, [api_key, dispatch, userDataList.branch, userDataList.department, userDataList.location])

  useEffect(() => {
    if ( userDataList.department && Object.keys(userDataList.department).length 
          && userDataList.sap_branch && !Object.keys(userDataList.sap_branch).length ) {
      dispatch(getSapBranch( {'api_key': api_key, 'app22_id': userDataList.department.app22_id} ));      
    }
  }, [api_key, dispatch, userDataList.department, userDataList.sap_branch])
    
  const setUser = val => {
    if ( !val ) {
      dispatch(clearForm());
      removeSession();
      dispatch(clearApprovals())
    }
      dispatch(unsetBrancList());
      dispatch(unsetDepartmentList());
      dispatch(unsetCompanyList());
      dispatch(unsetLocationList());
      dispatch(unSetPosition());
    // }
    dispatch(getUserId({ 'api_key': api_key, 'app12_id': val }));
  }

  const onSetCompany = val => {
    dispatch(setCompany(val))
  };

  const onSetBranch = val => {
    dispatch(setBranch(val))
  };

  const onSetDepartment = val => {
    dispatch(setDepartment(val))
  };

  const onSetLocation = val => {
    dispatch(setLocation(val))
  };

  const onSetPosition = val => {
    if ( !val ) dispatch(clearForm());
    dispatch(setPosition(val))
  };
  
  const onUnsetDepartment = () => {
    dispatch(setDepartment([]));
    dispatch(unSetSapBranch());
    dispatch(clearForm());
  };

  const onUnsetBranch = () => {
    dispatch(setBranch([]));
    dispatch(setDepartment([]));
    dispatch(unSetSapBranch());
    dispatch(unsetDepartmentList());
    dispatch(setLocation({name: null,}));
    dispatch(unsetLocationList());
    dispatch(clearForm());
  };

  const onUnsetCompany = () => {
    dispatch(setCompany({}))
    dispatch(setBranch({}));
    dispatch(setDepartment({}));
    dispatch(unsetBrancList());
    dispatch(unsetDepartmentList());
    dispatch(unsetLocationList());
    dispatch(setLocation({name: null,}));
    dispatch(clearForm());
  };

  const onUnsetlocation = () => dispatch(setLocation({name: null,}));

  let userDataStyle = dark 
    ? `${styles.userData} ${styles.dark}`
    : `${styles.userData}`

  
  const [showHint, setShowHint] = useState(null); 

  return (
    <div className={userDataStyle}>
      {/* <Row>
        <label htmlFor='oredrUser'>
          {`${dictionary.userName[lang]}`}
        </label>
        <div className={styles.wrapField}
          onMouseOver = {() => setShowHint('oredrUser')}
          onMouseOut = {() => setShowHint(null)}
        >
          <SelectInput
            selectHandler = { val => setUser(val) }
            placeholder = {`${dictionary.userNameOlaceholder[lang]}`}
            val = ''
            name='userName'
            mode = 'user'
            id = 'oredrUser'
          />
          <Hint
            isData = {userDataList.id}
            field = 'oredrUser'
            over = {showHint}
          />
        </div>
      </Row> */}

      <RowHint
        label = {dictionary.userName[lang]}
        field = {'oredrUser'}
        thereIs = {true}
        isData = {userDataList.id}
      >
        <SelectInput
          selectHandler = { val => setUser(val) }
          placeholder = {`${dictionary.userNameOlaceholder[lang]}`}
          val = ''
          name='userName'
          mode = 'user'
          id = 'oredrUser'
        />
      </RowHint>

      <div className={styles.userData}>
        { userDataLoad
          ? <div className={styles.userDataLoader}>
              {/* <UserDataLoader/> */}
              <div className={styles.loader}><UserDataLoader/></div>
            </div>
          : null
        }  
          
        { userDataList.id 
          ? <div className={styles.userDataList}>
              <Row>
                <label>{`${dictionary.email[lang]}`}</label>
                <div className={styles.wrapField}>
                  <InfoField val = {userDataList.email} />                          
                </div>
              </Row>

              <Row>
                <label>{`${dictionary.ad_account[lang]}`}</label>
                <div className={styles.wrapField}>
                  <InfoField val = {userDataList.ad_user} />                          
                </div>
              </Row>

              { Object.keys(userDataList.company).length || companyList.length
                ? <Row>
                    <label>{`${dictionary.company[lang]}`}</label>
                    <div className={styles.wrapField}>
                      { userDataList.company.name && !companyList.length
                        ? <InfoField val = {userDataList.company.name} />
                        : <Select
                            selectHandler = { val => onSetCompany(val) }
                            selectClear  = { () => onUnsetCompany() }
                            placeholder = '>'
                            selectList = {companyList}
                            val = ''
                            name='companySelect'
                          />
                      }
                    </div>
                  </Row>
                : null
              }
              
              { Object.keys(userDataList.branch).length || branchList.length
                ? <Row>
                    <label>{`${dictionary.branch[lang]}`}</label>
                    <div className={styles.wrapField}>
                      { !branchList.length
                        ? <InfoField val = {userDataList.branch.name} />
                        : <Select
                            selectHandler = { val => onSetBranch(val) }
                            selectClear  = { () => onUnsetBranch() }
                            placeholder = '>'
                            selectList = {branchList}
                            val = ''
                            name='branchSelect'
                          />
                      }
                    </div>
                  </Row>
                : null
              }

              {/* { Object.keys(userDataList.department).length || departmentLiist.length */}
              { Object.keys(userDataList.department).length || Object.keys(departmentLiist).length
                ? <Row>
                    <label>{`${dictionary.department[lang]}`}</label>
                    <div className={styles.wrapField}>
                      { !Object.keys(departmentLiist).length
                        ? <InfoField val = {userDataList.department.name} />
                        : <SelectTree
                            selectHandler = { val => onSetDepartment(val) }
                            selectClear  = { () => onUnsetDepartment() }
                            placeholder = '>'
                            selectList = {departmentLiist}
                            val = ''
                            name='departmenthSelect'
                          />  
                      }
                    </div>
                  </Row>
                : null
              }

              { Object.keys(userDataList.company).length || companyList.length
                ? <Row>
                    <label>{`${dictionary.position[lang]}`}</label>
                    <div className={styles.wrapField}>
                      { userDataList.position_name && !positionInput
                        ? <InfoField val = {userDataList.position_name} />
                        : <Input 
                            inputHandler = { val => onSetPosition(val) }
                            inputClear = { () => onSetPosition(null) }
                            placeholder = '>'
                            val = ''
                          />
                      }                       
                    </div>
                  </Row>
                : null
              }

              { userDataList.location || locationLiist.length
                ? <Row>
                    <label>{`${dictionary.location[lang]}`}</label>
                    <div className={styles.wrapField}
                      onMouseOver = {() => setShowHint('location')}
                      onMouseOut = {() => setShowHint(null)}                    
                    >
                      { !locationLiist.length
                        ? <InfoField val = { userDataList.location } />
                        : <Select
                            selectHandler = { val => onSetLocation(val) }
                            selectClear  = { () => onUnsetlocation() }
                            placeholder = '>'
                            selectList = {locationLiist}
                            val = ''
                            name='locationSelect'
                          />  
                      }
                      { !userDataList.location && locationLiist.length
                        ? <Hint
                            isData = {userDataList.location}
                            field = 'location'
                            over = {showHint}
                          />
                        : null  
                      }
                      
                    </div>
                  </Row>
                : null
              }

              { Object.keys(userDataList.sap_branch).length
                ? <Row>
                    <label>{`${dictionary.sap_branch[lang]}`}</label>
                    <div className={styles.wrapField}>
                      <InfoField val = {userDataList.sap_branch.name } />                          
                    </div>
                  </Row>
                : null
              }
                

            </div>
          : null  
        }
      </div>
    </div>
  )
}
