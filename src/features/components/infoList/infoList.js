import React, { Fragment, useState } from "react";
import styles from './infoList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleXmark, } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import { guidesData } from "../../corpsystems/corpsystemsSlice";
import { user } from "../../user/userSlice";
import { GuideLine } from "./guideLine/guideLine";
import dictionary from '../../../dictionary.json';

export const InfoList = () => {

  const dark = useSelector(darkTheme);
  const guides = useSelector(guidesData);
  const { lang } = useSelector(user);
  
  const [show, setShow] = useState(false);

  let infoListStyle = dark 
  ? `${styles.infoList} ${styles.dark}`
  : `${styles.infoList}`

  return (
    <div className={infoListStyle}>
      <button type='button' className={styles.btnGuide}
        onClick={() => setShow(!show)}
      >{  show
          ? <FontAwesomeIcon icon={ faCircleXmark } className={styles.clsGuide}/>
          : <Fragment>
            <FontAwesomeIcon icon={ faCircleInfo } className={styles.icoGuide}/>
            <div className={styles.lblGuide}>
            {dictionary.information[lang]}
            </div>
          </Fragment>
      }</button>
      { show
        ? <ul className={styles.guidesList}>{
            guides.map((item, index) => <GuideLine item = {item} key={index}/>)
          }</ul>
        : null  
      }
      
    </div>
  )
}
