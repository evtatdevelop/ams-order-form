import React, { Fragment } from "react";
import styles from './approvals.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, } from '../../user/userSlice';
import { darkTheme } from "../../main/mainpageSlice";
import dictionary from '../../../dictionary.json';
import {sessionKeyData,  getApprovalRoute, rolesData, userData, approveLoadingData, approvalsData, } from "../corpsystemsSlice";
import { ApprovalDataLoader } from "./dataLoader";
import { OneRoleApproval } from "./oneRoleApproval/oneRoleApproval";

export const Approvals = () => {
  const dispatch = useDispatch();
  const { lang, api_key, } = useSelector(user);
  const dark = useSelector(darkTheme);
  const sessionKey = useSelector(sessionKeyData);
  const roles = useSelector(rolesData);
  const approvals = useSelector(approvalsData);
  const {boss, sap_branch} = useSelector(userData);
  const approveLoading = useSelector(approveLoadingData);

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
              app12: item.app12.filter((obj, idx, arr) => idx === arr.findIndex((t) => t.id === obj.id)),
            },
          ]
        }
      }
    }, {}))
    .map(item => Object.fromEntries(Object.entries(item).sort()))
    .map(item => Object.values(item));

  return ( 
    <div className={approvalsStyle}>
      { !approvals.length
        ? <button type="button" className={styles.btnRouteApproval} 
            onClick={ () => getApprovals() }
          >{ approveLoading
             ? <div className={styles.loader}><ApprovalDataLoader/></div>
             : dictionary.request_route_approval[lang]
          }</button>

        : <section className={styles.approvalLists}>
            <Fragment>
              <h2 className={styles.approvalCaption}>{dictionary.necessary_approvals[lang]}</h2>
              <div className={styles.tabHeadApproval}>
                <div>{dictionary.stage[lang]}</div>
                <div>{dictionary.org_level[lang]}</div>
                <div>{dictionary.approver_s[lang]}</div>
              </div>
              { approvalTab.map((item, index) => <OneRoleApproval
                  key = {index}
                  item = {item}
                  index = {index}
                />
                ) 
              }
            </Fragment>
        </section> 
      }
    </div>
  )
}
