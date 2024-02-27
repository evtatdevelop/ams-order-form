import React from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";
import { RU, GB } from 'country-flag-icons/react/3x2'

export const LangButton = () => {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  const lang = userData['lang'];

  // const active = lang
  // console.log(lang);

  let ruFlag = styles.flag;
  let enFlag = styles.flag;
  if ( lang === 'RU' ) ruFlag = `${styles.flag} ${styles.on}`
  else enFlag = `${styles.flag} ${styles.on}`;

  return (
    <div className={styles.langButton}>

      <button type='button'
        className={styles.langSwitcher}
        onClick={() => lang === 'RU' ? dispatch(setLang( {'app12_id': userData['id'], 'lang': 'EN', 'api_key': userData.api_key} )) : {}}
      >
        <GB title="English" className={enFlag}/>
      </button>

      <button type='button'
        className={styles.langSwitcher}
        onClick={() => lang !== 'RU' ? dispatch(setLang( {'app12_id': userData['id'], 'lang': 'RU', 'api_key': userData.api_key} )) : {}}
      >
        <RU title="Русский" className={ruFlag}/>
      </button>
      
    </div>

  )
}