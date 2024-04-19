import React, { useEffect } from "react";
import styles from './systems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { corpSyst, getSystemList, systemListData, setSapSystem, getSubSystemList, userData, paramsData,
  subSystemListData, unSetSapSystem, setSabSapSystem, unSetSabSapSystem, getGetParam, 
  getProcessGroups, subSystemLoadingData, getRoles } from "../corpsystemsSlice";
import { Row } from "../../components/row/row";
import Select from "../../components/select/select";
import { DataLoader } from "./dataLoader";

export const Systems = () => {
  const dispatch = useDispatch();
  const { id, lang, api_key } = useSelector(user);
  const cs                    = useSelector(corpSyst);
  const systemList            = useSelector(systemListData);
  const subSystemList         = useSelector(subSystemListData);
  const mainUser              = useSelector(userData);
  const params                = useSelector(paramsData);
  const subSystemLoading      = useSelector(subSystemLoadingData);


  useEffect(() => {
    if ( cs && cs.asz22_id && cs.instance_type ) 
      dispatch(getSystemList( {'api_key': api_key, 'asz22_id': cs.asz22_id, 'instance_type': cs.instance_type} ))
  }, [api_key, cs, dispatch]);


  useEffect(() => {
    if ( cs && cs.sapSystem && Object.keys(cs.sapSystem).length ) {
      dispatch(getGetParam( {'api_key': api_key, 'param_code': 'ENABLE_SUBSYSTEMS', 'asz22_id': cs.asz22_id, 'asz00_id': cs.sapSystem.asz00_id} ))     
      
      if ( Object.keys(mainUser).length 
            && id 
            && cs.sapSystem 
            && Object.keys(cs.sapSystem).length 
            && Object.keys(mainUser.sap_branch).length && mainUser.sap_branch.asz01_id
      ) dispatch(getProcessGroups( {
          api_key: api_key,
          asz00_id: cs.sapSystem.asz00_id,
          asz01_id: mainUser.sap_branch.asz01_id,
          instance_type: cs.instance_type,
          app12_id_author: id,
          orderType: 'ADD_PRIVS',
          app12_id: mainUser.id, 
        } ));
    }
  }, [api_key, cs, dispatch, id, mainUser]);

  
  useEffect(() => {
    if ( cs && cs.sapSystem && Object.keys(cs.sapSystem).length && params.enable_subsystems === '1' ) {
      dispatch(getSubSystemList( {'api_key': api_key, 'asz00_id': cs.sapSystem.asz00_id} ));
    }         
  }, [api_key, cs, dispatch, params]);

  
  useEffect(() => {

    //! RoleList
    if ( cs && cs.sapSystem 
        && Object.keys(cs.sapSystem).length 
        && ( params.enable_subsystems !== null && !params.enable_subsystems) 
      ) {
      dispatch(getRoles( {
        api_key: api_key,
        asz00_id: cs.sapSystem.asz00_id,
        asz01_id: mainUser.sap_branch.asz01_id,
        instance_type: cs.instance_type,
        app12_id_author: id,
        orderType: 'ADD_PRIVS',
        app12_id: mainUser.id, 
      } ));
    }         
  }, [api_key, cs, dispatch, id, mainUser.id, mainUser.sap_branch.asz01_id, params.enable_subsystems]);


  useEffect(() => {

    //! RoleList
    if ( cs && cs.sapSystem 
        && Object.keys(cs.sapSystem).length 
        && Object.keys(cs.sapSystem.subSapSystem).length 
        && cs.sapSystem.subSapSystem.asz80_id
    ) { dispatch(getRoles( {
          api_key: api_key,
          asz00_id: cs.sapSystem.asz00_id,
          asz01_id: mainUser.sap_branch.asz01_id,
          instance_type: cs.instance_type,
          app12_id_author: id,
          orderType: 'ADD_PRIVS',
          app12_id: mainUser.id, 
      } ));
      
   }
            
  }, [api_key, cs, dispatch, id, mainUser]);


  return (
    <div className={styles.systems}>
      <Row>
        <label>{`${dictionary.system[lang]}`}</label>
        <div className={styles.wrapField}>
          <Select
            selectHandler = { val => dispatch(setSapSystem(val)) }
            selectClear  = { () =>  dispatch(unSetSapSystem()) }
            placeholder = '>'
            selectList = {systemList}
            val = ''
            name='systemSelect'
          />
        </div>
      </Row>

      { params.enable_subsystems === '1'
        ? <Row>
            { subSystemList.length 
              ? <>
                  <label>{`${dictionary.subsystem[lang]}`}</label>
                  <div className={styles.wrapField}>
                    <Select
                      selectHandler = { val => dispatch(setSabSapSystem(val)) }
                      selectClear  = { () => dispatch(unSetSabSapSystem()) }
                      placeholder = '>'
                      selectList = {subSystemList}
                      val = ''
                      name='systemSelect'
                    />
                  </div>                 
                </>
              : null
            }    
          </Row>
        : null
      }

      { subSystemLoading
        ? <Row>
            <label></label>
            <div className={styles.loader}><DataLoader/></div>
          </Row>
        : null
      }
    </div>
  )
}
