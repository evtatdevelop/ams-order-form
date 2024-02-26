import React from "react";
import styles from './langButton.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, setLang } from "../../user/userSlice";

export const LangButton = () => {
  const userData = useSelector(user);
  const dispatch = useDispatch();
  const lang = userData['lang'];

  // const active = lang
  console.log(lang);

  return (
    <div className={styles.langButton}>
      <button type='button'
        className={styles.langSwitcher}
        onClick={() => {
          dispatch(setLang( {'app12_id': userData['id'], 'lang': 'EN', 'api_key': userData.api_key} ))
        }}
      >En</button>
      <button type='button'
        className={styles.langSwitcher}
        onClick={() => {
          dispatch(setLang( {'app12_id': userData['id'], 'lang': 'RU', 'api_key': userData.api_key} ))
        }}
      >Ru</button>
      
    </div>

  )
}