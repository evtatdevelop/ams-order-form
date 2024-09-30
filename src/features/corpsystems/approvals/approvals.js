import React from "react";
import styles from './approvals.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, } from '../../user/userSlice';
import { darkTheme } from "../../main/mainpageSlice";
import dictionary from '../../../dictionary.json';
import {sessionKeyData,  getApprovalRoute, rolesData, userData, approveLoadingData, approvalsData, corpSyst } from "../corpsystemsSlice";
import { ApprovalDataLoader } from "./dataLoader";

export const Approvals = () => {
  const dispatch = useDispatch();
  const { lang, api_key, } = useSelector(user);
  const dark = useSelector(darkTheme);
  const sessionKey = useSelector(sessionKeyData);
  const roles = useSelector(rolesData);
  const approvals = useSelector(approvalsData);
  const {boss, sap_branch} = useSelector(userData);
  const approveLoading = useSelector(approveLoadingData);
  const corpSystem = useSelector(corpSyst);

  const getApprovals = () => {
    if ( approveLoading ) return;

    const apoveRoleData = roles.reduce((res, item) => [...res, {blk_id: item.cnt, asz03_id: item.role.id }], []);

    dispatch(getApprovalRoute({api_key, 
      session_key: sessionKey, 
      asz01_id: sap_branch.asz01_id,
      boss_id: boss,
      apoveRoleData
    }));
  }

  let approvalsStyle = dark 
    ? `${styles.approvals} ${styles.dark}`
    : `${styles.approvals}`


  return ( 
    <div className={approvalsStyle}>
      { !approvals.length
        ? <button type="button" className={styles.btnRouteApproval} 
            onClick={ () => getApprovals() }
          >{  approveLoading
              ? <div className={styles.loader}><ApprovalDataLoader/></div>
              : dictionary.request_route_approval[lang]
          }</button>

        : <section className={styles.approvalLists}>{ 
          approvals.map((item, index)=>
              <div key={index} className={styles.oneRoleApproval}>
                <h2 className={styles.nameRoleApproval}>{`Роль:  ${corpSystem.sapSystem.name} / ${roles[index].role.proccss_group_name} / ${roles[index].role.name}`}</h2>   
                { Object.values(item).map((itm, i) => <div key={i} className={styles.roleApprovals}>
                  <div>{itm.asz10_order_seq}</div>
                  <div>{itm.asz10_name}</div>
                  <div>{itm.asz06_code_value}</div>
                  <div>{itm.app12[0].fio}</div>
                </div>)}
              </div>)

        }</section> 
      }
      
    
    </div>
  )
}
