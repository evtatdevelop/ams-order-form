import React from "react";
import styles from './submit.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import dictionary from '../../../dictionary.json';
import { user as author, } from '../../user/userSlice';
import { SubmitlDataLoader } from "./dataLoader";
import { userData } from "../corpsystemsSlice";
import { rolesData } from "../corpsystemsSlice";
import { approvalsData } from "../corpsystemsSlice";


export const Submit = () => {
  const dispatch = useDispatch();
  const dark = useSelector(darkTheme);
  const authorData = useSelector(author);
  const user = useSelector(userData);
  const roles = useSelector(rolesData);
  const approval = useSelector(approvalsData);


  const submit = () => {
    console.log({
      author: authorData.id,
      user_id: user.id,
      hrs01_id: user.company.hrs01_id,
      hrs05_id: user.branch.hrs05_id,
      app22_id: user.department.app22_id,
      location: user.location,
      position: user.position_name,
      asz01_id: user.sap_branch.asz01_id,
      boss_id: user.boss,
      roles: [ ...roles.map(item => ({
        cnt: item.cnt,
        role_id: item.role.id,
        dates: item.dates ?? {},
        comment: item.comment ?? null,
        levels: [...item.levels.map(lvl => ({
          asz05_id: lvl.asz05_id,
          values: lvl.value,
        }))],
      })) ],
      agreements: [ ...approval.map((item, index) => ({
        cnt: index,
        agreements: [...Object.entries(item).map(itm => ({
          asz10_id: itm[1].asz10_id,
          asz06_id: itm[1].asz06_id,
          app12_id: null,
        }))]

      })) ],
    });
    
  }

  let submitStyle = dark 
    ? `${styles.submit} ${styles.dark}`
    : `${styles.submit}`

  return (
    <div className={submitStyle}>
      <button type="button" className={styles.btnSubmit}
        onClick={()=>submit()}
      > { false
          ? <div className={styles.loader}><SubmitlDataLoader/></div>
          : dictionary.submit_approval[authorData.lang]
        }    
      </button>
    </div>
  )
}
