import React from "react";
import styles from './approvals.module.scss';
import { useSelector } from "react-redux";
import { user, } from '../../user/userSlice';
import { darkTheme } from "../../main/mainpageSlice";
import dictionary from '../../../dictionary.json';

export const Approvals = () => {
  // const dispatch = useDispatch();
  const { lang, api_key } = useSelector(user);
  const dark              = useSelector(darkTheme);
  

  let approvalsStyle = dark 
    ? `${styles.approvals} ${styles.dark}`
    : `${styles.approvals}`

  return (
    <div className={approvalsStyle}>

      <button type="button" className={styles.btnRouteApproval} 
        onClick={ () => console.log('Form a consideration route') }
      >{dictionary.request_route_approval[lang]}</button>
    
    </div>
  )
}
