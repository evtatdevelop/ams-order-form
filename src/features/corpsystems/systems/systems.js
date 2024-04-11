import React, { useEffect } from "react";
import styles from './systems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, } from '../../user/userSlice';
import dictionary from '../../../dictionary.json';
import { corpSyst, getSystemList, systemListData, setSapSystem, getSubSystemList, 
  subSystemListData, unSetSapSystem, setSabSapSystem, unSetSabSapSystem } from "../corpsystemsSlice";
import { Row } from "../../components/row/row";
import Select from "../../components/select/select";

export const Systems = () => {
  const dispatch = useDispatch();
  const { lang, api_key } = useSelector(user);
  const cs                = useSelector(corpSyst);
  const systemList        = useSelector(systemListData);
  const subSystemList     = useSelector(subSystemListData);

  useEffect(() => {
    if ( cs && cs.asz22_id && cs.instance_type ) 
      dispatch(getSystemList( {'api_key': api_key, 'asz22_id': cs.asz22_id, 'instance_type': cs.instance_type} ))
  }, [api_key, cs, dispatch]);

  useEffect(() => {
    if ( cs && cs.sapSystem && Object.keys(cs.sapSystem).length && cs.sapSystem.sub)
      dispatch(getSubSystemList( {'api_key': api_key, 'asz00_id': cs.sapSystem.asz00_id} ))
  }, [api_key, cs, dispatch]);


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

      { cs.sapSystem.sub
        ? subSystemList.length 
          ? <Row>
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
            </Row>
          : null //? subSystemLoading  
        : null
      }
    </div>
  )
}
