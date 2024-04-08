import React from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";
import { RU, GB, CN } from 'country-flag-icons/react/3x2'

export const LangButton = () => {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  const lang = userData['lang'];

  // const active = lang
  // console.log(lang);

  let ruFlag = styles.flag;
  let enFlag = styles.flag;
  let zhFlag = styles.flag;

  switch ( lang ) {
    case 'RU': ruFlag = `${styles.flag} ${styles.on}`; break;
    case 'EN': enFlag = `${styles.flag} ${styles.on}`; break;
    case 'ZH': zhFlag = `${styles.flag} ${styles.on}`; break; 
    default: ; break;
  }

  // if ( lang === 'RU' ) ruFlag = `${styles.flag} ${styles.on}`
  // else enFlag = `${styles.flag} ${styles.on}`;

  return (
    <div className={styles.langButton}>

      <button type='button'
        className={styles.langSwitcher}
        onClick={() => lang !== 'RU' ? dispatch(setLang( {'app12_id': userData['id'], 'lang': 'RU', 'api_key': userData.api_key} )) : {}}
      >
        <RU title="Русский" className={ruFlag}/>
      </button>

      <button type='button'
        className={styles.langSwitcher}
        onClick={() => lang !== 'ZH' ? dispatch(setLang( {'app12_id': userData['id'], 'lang': 'ZH', 'api_key': userData.api_key} )) : {}}
      >
        <CN title="中文" className={zhFlag}/>
      </button>

      <button type='button'
        className={styles.langSwitcher}
        onClick={() => lang !== 'EN' ? dispatch(setLang( {'app12_id': userData['id'], 'lang': 'EN', 'api_key': userData.api_key} )) : {}}
      >
        <GB title="English" className={enFlag}/>
      </button>

    </div>

  )
}