import React from "react";
import styles from './guideLine.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../main/mainpageSlice";
import { user } from "../../../user/userSlice";

export const GuideLine = props => {
  const { item } = props;
  const dark = useSelector(darkTheme);
  const { lang } = useSelector(user);

  console.log(
    item
  );


  let link = item.link && item.link 
    ? item.link[lang] ?? item.link.EN ?? item.link.RU
    : null
  
    let name = Object.keys(item.name)?.length  
    ? item.name[lang] ?? item.name.EN ?? item.name.RU
    : null

    

    if ( Array.isArray(link) ) {
      name = link.reduce((res, ln, index) => {
        // const str = '$' + `${index+1}`;
        const str = `$${index+1}`;
        // return res.replace(str, ln)
        return res.replace(str, `<a href=${ln}>${ln}</a>`) //! not work
      }, name)
    }


  let guideLineStyle = dark 
  ? `${styles.guideLine} ${styles.dark}`
  : `${styles.guideLine}`

  return (
    <li className={guideLineStyle}>{
      link && ! Array.isArray(link)
      ? <a href={link} target="_blank" rel="noreferrer">{name}</a>
      : <p>{name}</p>
  
    }</li>
  )
}
