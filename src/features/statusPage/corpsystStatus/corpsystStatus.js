import React, {Fragment} from "react";
import styles from './corpsystStatus.module.scss';
import { useSelector } from "react-redux";
import { user, } from '../../user/userSlice';
import { darkTheme, } from "../../main/mainpageSlice";
import { orderData, } from "../statusPageSlice";
import dictionary from "../../../dictionary.json"
import { upperFirst, strToStrDate } from "../../../utils";
import { Row } from "../../components/row/row";
import { InfoField } from "../../components/infoField/infoField";


export const CorpsystStatus = () => {
  const { lang, } = useSelector(user);
  const dark = useSelector(darkTheme);
  const order = useSelector(orderData);

  
  const corpsystStatusStyle = dark 
    ? `${styles.corpsystStatus} ${styles.dark}`
    : `${styles.corpsystStatus}`

    const roleAgreements = Object.entries( 
      order.agreement.reduce((result, item) => {
        const agreeVals = result[item.asz32_id]?.length ? [...result[item.asz32_id], item] : [item];
        return {...result, [item.asz32_id]:  agreeVals};
      }, {}) 
    ).reduce((result, item) => {
      const stg = item[1].reduce((stage, agree) => {
        const agreeSage = stage[`_${agree.asz10_seq}`]?.length ? [...stage[`_${agree.asz10_seq}`], agree] : [agree];
        return {...stage, [`_${agree.asz10_seq}`]:  agreeSage};
      },{})
      return {...result, [item[0]]: stg}
    }, {});
      

  return (
    <div className={corpsystStatusStyle} >
      
        <span className={styles.systName}>
          { upperFirst(
              lang === 'ZH' 
              ? `${order.corp_system.asz22_name} ${dictionary.application_for_access_to[lang]}`
              : `${dictionary.application_for_access_to[lang]} ${order.corp_system.asz22_name}`
          )}
        </span>  

        <div className={styles.oderNum}>{`${dictionary.request_number[lang]}: ${order.main.order_num}`}</div>    

        <Row>
          <label>{`${dictionary.date_creation[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {strToStrDate(order.main.date_open, lang)} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.applicant[lang]}`}</label>
          {/* <div className={styles.wrapField}><InfoField val = {order.main.app12_id_author} /></div> */}
          <div className={styles.wrapField}><InfoField val = {`${order.main.author_name} (${order.main.author_email})`} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.request_status[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {order.main.status} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.userName[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {`${order.main.last_name} ${order.main.first_name} ${order.main.middle_name} (${order.main.email})`} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.ad_account[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {order.main.sap_login} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.position[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {order.main.position} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.company[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {order.main.company} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.branch[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {order.main.branch} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.department[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {order.main.division} /></div>
        </Row>

        <Row>
          <label>{`${dictionary.location[lang]}`}</label>
          <div className={styles.wrapField}><InfoField val = {order.main.location} /></div>
        </Row>

        <div className={styles.asked_accesses}>{dictionary.asked_access_permissions[lang]}</div>
        <ul className={styles.askedPermissions}>{
          Object.values(order.askedPermissions).map( (role, index) => 
          <li key={index} className={styles.role}>
            <label className={styles.roleName}>{`${role.asz32_name} ${role.role_cod}`}</label>
            <ul className={styles.roleLevel}>{
              Object.entries(role.levels).map((level, indx) => 
                <li key={indx} className={styles.level}>
                  <label className={styles.levelName}>{level[0]}</label>
                  <ul className={styles.values}>{
                    Object.values(level[1]).map((value, i) =>
                      <li key={i} className={styles.value}>{`${value.code_val}`}<span>{` (${value.asz06_name})`}</span></li>
                    )
                  }</ul>
              </li>)
            }</ul>
          </li> )
        }</ul>
        

        {/* {console.log( roleAgreements )} */}

        { order.roles.map(role => <div key={role.asz32_id} className={styles.agreements}>
          <Row>
            <label>{`${dictionary.system[lang]}`}</label>
            <div className={styles.wrapField}><InfoField val = {role.asz00_full_name} /></div>
          </Row>
          <Row>
            <label>{`${dictionary.subsystem[lang]}`}</label>
            <div className={styles.wrapField}><InfoField val = {lang === 'RU' ? order.main.asz80_full_name : order.main.asz80_full_name_en} /></div>
          </Row>
          <Row>
            <label>{`${dictionary.nameRole[lang]}`}</label>
            <div className={styles.wrapField}><InfoField val = {role.asz03_name} /></div>
          </Row>
          <Row>
            <label>{`${dictionary.nameProcessGroup[lang]}`}</label>
            <div className={styles.wrapField}><InfoField val = {role.asz02_name} /></div>
          </Row>
          <Row>
            <label>{`${dictionary.code[lang]}`}</label>
            <div className={styles.wrapField}><InfoField val = {role.role_cod} /></div>
          </Row>
          <Row>
            <label>{`${dictionary.role_valid[lang]}`}</label>
            <div className={styles.wrapField}><InfoField val = {`${role.date_from} - ${role.date_to}`} /></div>
          </Row>
          <Row>
            <label>{`${dictionary.comment[lang]}`}</label>
            <div className={styles.wrapField}><InfoField val = {role.comments} /></div>
          </Row>

          <ul className={styles.roleAgreements}>{ 
            Object.entries(roleAgreements[role.asz32_id]).map(agreeStage => <li key={`${role.asz32_id}${agreeStage[0]}`} className={styles.stage}>
              <label>{agreeStage[1][0].asz10_name}</label>
              <ul className={styles.stageAgreements}>{
                agreeStage[1].map(agree=> <Fragment key={agree.asz06_id}>
                  <div>{agree.asz06_path}</div>
                  <div>{`${agree.app12_name} ${agree.app12_email}`}</div>
                  <div>{agree.status}</div>
                </Fragment>)  
              }</ul>
            </li>)
          }</ul>

        </div>)

        }



    </div>    
  )
}
