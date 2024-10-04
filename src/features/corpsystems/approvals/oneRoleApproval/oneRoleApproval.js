import React, { Fragment, useState } from "react";
import styles from './oneRoleApproval.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../main/mainpageSlice";
import { rolesData, corpSyst } from "../../corpsystemsSlice";
import Select from "./select/select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export const OneRoleApproval = props => {
  const {item, index} = props;
  const dark = useSelector(darkTheme);
  const roles = useSelector(rolesData);
  const corpSystem = useSelector(corpSyst);

  const [show, setShow] = useState(true);

  let oneRoleApprovalStyle = dark 
    ? `${styles.oneRoleApproval} ${styles.dark}`
    : `${styles.oneRoleApproval}`
  
    let levelAproveItemStyle = show 
    ? `${styles.levelAproveItem} ${styles.hide}`
    : `${styles.levelAproveItem}`
  
    let plugStyle = !show 
    ? `${styles.plug} ${styles.hide}`
    : `${styles.plug}`

  return ( 
    <div key={index} className={oneRoleApprovalStyle}>
      
      <button type="button" className={styles.nameRoleApproval} onClick={() => setShow(!show)} >
        <div className={styles.showBtn}>{ show
          ? <FontAwesomeIcon icon={ faPlus } className={styles.openSignPlus} />
          : <FontAwesomeIcon icon={ faMinus } className={styles.openSignMinus} />
        }</div>

        {/* <label>Роль:</label> */}
        
        <div className={styles.roleName}>
          {/* {` ${corpSystem.sapSystem.name} / ${roles[index].role.proccss_group_name} / ${roles[index].role.name}`} */}
          {`${roles[index].role.proccss_group_name} / ${roles[index].role.name}`}
        </div>  
      </button>   
      
      <div className={styles.roleApprovals}>
        {item.map((itm, indx) => <Fragment key={indx}>
          <div>{itm.asz10_name}</div>
          <div className={styles.levelApprove}>
            
            <Fragment>
              <div className={plugStyle}><FontAwesomeIcon icon={ faEllipsis } className={styles.faCaret} /></div>
              <div className={plugStyle}><FontAwesomeIcon icon={ faEllipsis } className={styles.faCaret} /></div>
            </Fragment>

            { itm.asz06.map((i, c) => <Fragment key={c}>
                <div className={levelAproveItemStyle}>{i.asz06_code_value}</div>
                <div className={levelAproveItemStyle}>{ 
                  i.app12.length > 1
                  ? <Select
                      // selectHandler = { val => console.log('set', val) }
                      selectHandler = { val => {} }
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
}
