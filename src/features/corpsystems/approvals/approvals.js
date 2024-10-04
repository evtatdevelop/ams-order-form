import React, { Fragment, useState } from "react";
import styles from './approvals.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, } from '../../user/userSlice';
import { darkTheme } from "../../main/mainpageSlice";
import dictionary from '../../../dictionary.json';
import {sessionKeyData,  getApprovalRoute, rolesData, userData, approveLoadingData, approvalsData, corpSyst } from "../corpsystemsSlice";
import { ApprovalDataLoader } from "./dataLoader";
import Select from "./select/select";
// import { OneRoleApproval } from "./oneRoleApproval/oneRoleApproval";

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



  const approvalTab = approvals
    .map(item => Object.values(item))
    .map(item => item.reduce((res, item) => {
      return { ...res, 
        [item.asz10_order_seq]: {
          asz10_order_seq: item.asz10_order_seq,
          asz10_name: item.asz10_name,
          asz10_id: item.asz10_id,
          asz06: [ ...res[item.asz10_order_seq] ? res[item.asz10_order_seq].asz06 : [],
            { asz06_code_value: item.asz06_code_value,
              asz06_id: item.asz06_id,
              asz06_id_parent: item.asz06_id_parent,
              app12: item.app12.filter((obj, idx, arr) => idx === arr.findIndex((t) => t.id === obj.id)) }, 
          ]
        }
      }
    }, {}))
    .map(item => Object.fromEntries(Object.entries(item).sort()))
    .map(item => Object.values(item));
    
    // console.log(approvalTab);

  return ( 
    <div className={approvalsStyle}>
      { !approvals.length
        ? <button type="button" className={styles.btnRouteApproval} 
            onClick={ () => getApprovals() }
          >{ approveLoading
             ? <div className={styles.loader}><ApprovalDataLoader/></div>
             : dictionary.request_route_approval[lang]
          }</button>

        : <section className={styles.approvalLists}>{ 
            approvalTab.map((item, index)=>

              <div key={index} className={styles.oneRoleApproval}>
                <h2 className={styles.nameRoleApproval}>{`Роль:  ${corpSystem.sapSystem.name} / ${roles[index].role.proccss_group_name} / ${roles[index].role.name}`}</h2>   
                <div className={styles.roleApprovals}>
                  {item.map((itm, indx) => <Fragment key={indx}>
                    <div>{itm.asz10_name}</div>
                    <div className={styles.levelApprove}>
                      { itm.asz06.map((i, c) => <Fragment key={c}>
                          <div>{i.asz06_code_value}</div>
                          <div>{ 
                            i.app12.length > 1
                            ? <Select
                                selectHandler = { val => console.log('set', val) }
                                selectClear  = { () =>  console.log('clean') }
                                placeholder = '>'
                                selectList = {i.app12}
                                val = ''
                                name={`p${index}${indx}${c}`}
                                id={`p${index}${indx}${c}`}
                              />
                            : i.app12[0].name
                          }</div>                      
                        </Fragment>)
                      }
                    </div>
                  </Fragment> )
                  }
                </div>
              </div>

            )
        }</section> 
      }
    </div>
  )
}
