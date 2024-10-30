import React, { useEffect } from "react";
import styles from './submit.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import dictionary from '../../../dictionary.json';
import { user as author, } from '../../user/userSlice';
import { SubmitlDataLoader } from "./dataLoader";
// import { userData } from "../corpsystemsSlice";
// import { rolesData } from "../corpsystemsSlice";
import { corpSyst, userData, rolesData, aprovalSubmitData, submitLoadingData, postSubmitForm, sessionKeyData, orderIdData, clearForm, sentData, getUserId} from "../corpsystemsSlice";
import { useNavigate } from "react-router-dom";

export const Submit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const dark = useSelector(darkTheme);
  const authorData = useSelector(author);
  const user = useSelector(userData);
  const roles = useSelector(rolesData);
  const approval = useSelector(aprovalSubmitData);
  const submitLoading = useSelector(submitLoadingData);
  const sessionKey = useSelector(sessionKeyData);
  const cs = useSelector(corpSyst);
  const orderId = useSelector(orderIdData);
  const sent = useSelector(sentData);


  useEffect(() => {
    // if ( orderId ) navigate(`/status/corpsystems/${orderId}`);
    if ( orderId ) navigate(`/status/corpsystems/${sessionKey}`);
    
  }, [navigate, orderId, sessionKey]);

  useEffect(() => {
    if ( sent && !submitLoading ) {
      dispatch(clearForm());
      dispatch(getUserId({}));
    }
  },[dispatch, sent, submitLoading])

  const submit = () => {

    const submitData = {
      author: authorData.id,
      user_id: user.id,
      hrs01_id: user.company.hrs01_id,
      hrs05_id: user.branch.hrs05_id,
      app22_id: user.department.app22_id,
      location: user.location,
      position: user.position_name,
      asz01_id: user.sap_branch.asz01_id,
      boss_id: user.boss,
      asz22_id: cs.asz22_id,
      asz24_id: cs.asz24_id,
      asz00_id: cs.sapSystem.asz00_id,
      asz80_id: cs.sapSystem.subSapSystem.asz80_id,
      roles: [ ...roles.map(item => ({
        cnt: item.cnt,
        role_id: item.role.id,
        dates: item.dates ?? {},
        comment: item.comment ?? null,
        levels: [...item.levels.map(lvl => ({
          asz05_id: lvl.asz05_id,
          values: lvl.value,
        }))],
        approval: [
          ...approval.filter(appove => appove.cnt === item.cnt - 1 )
        ]
      })) ],
    }

    dispatch(postSubmitForm({
      api_key: authorData.api_key, 
      session_key: sessionKey, 
      submitData
    }));
  }

  let submitStyle = dark 
    ? `${styles.submit} ${styles.dark}`
    : `${styles.submit}`

  return (
    <div className={submitStyle}>
      <button type="button" className={styles.btnSubmit}
        onClick={()=>submit()}
      > { submitLoading
          ? <div className={styles.loader}><SubmitlDataLoader/></div>
          : dictionary.submit_approval[authorData.lang]
        }    
      </button>
    </div>
  )
}
