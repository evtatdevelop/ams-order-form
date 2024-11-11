import React, { Fragment, useState, useEffect, } from "react";
import styles from './infoList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleXmark, } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import { guidesData, corpSyst } from "../../corpsystems/corpsystemsSlice";
import { user } from "../../user/userSlice";
import { GuideLine } from "./guideLine/guideLine";
import dictionary from '../../../dictionary.json';

export const InfoList = () => {
  
  const dispatch = useDispatch();
  const dark = useSelector(darkTheme);
  const guides = useSelector(guidesData);
  const { lang } = useSelector(user);
  const cs = useSelector(corpSyst);

  const [show, setShow] = useState(true);

  console.log(guides);
  

  useEffect(() => {
    if ( JSON.parse(localStorage.getItem('info'))?.includes(cs?.system_prefix) ) setShow(false)
  }, [cs?.system_prefix]);

  const closeInfo = () => {
    setShow(!show)
    if ( !JSON.parse(localStorage.getItem('info'))?.includes(cs?.system_prefix) )
      localStorage.setItem(`info`, JSON.stringify([...JSON.parse(localStorage.getItem('info')) || []  ,cs.system_prefix]));
  }

  let infoListStyle = dark 
  ? `${styles.infoList} ${styles.dark}`
  : `${styles.infoList}`

  return (
    <>
      { guides.length
        ? <div className={infoListStyle}>
            <button type='button' className={styles.btnGuide}
              onClick={() => closeInfo()}
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
        : null  
      }    
    </>

    
  )
}
