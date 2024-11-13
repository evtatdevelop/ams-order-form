import React, { Fragment } from "react";
import styles from './guideLine.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../main/mainpageSlice";
import { user } from "../../../user/userSlice";

export const GuideLine = props => {
  const { item } = props;
  const dark = useSelector(darkTheme);
  const { lang } = useSelector(user);

  let link = item.link && item.link 
    ? item.link[lang] ?? item.link.EN ?? item.link.RU
    : null
  
    let name = Object.keys(item.name)?.length  
    ? item.name[lang] ?? item.name.EN ?? item.name.RU
    : null

  let guideLineStyle = dark 
  ? `${styles.guideLine} ${styles.dark}`
  : `${styles.guideLine}`

  return (
    <li className={guideLineStyle}>{
      link && ! Array.isArray(link)
      ? <a href={link} target="_blank" rel="noreferrer">{name}</a>
      : <p>{
          name.split(' ').map((word, index) => {
            if ( word.match(/^\$\d(.){0,1}/)?.length ) {
              let number = null; 
              let last = word.slice(-1)
              if ( Number.isInteger(+last) ) {
                number = last;
                last = ' ' 
              } else {
                number = word.at(-2);
                last = `${last} ` 
              }
              return <Fragment key={index}><a href={link[number-1]} target="_blank" rel="noreferrer">{link[number-1]}</a>{last}</Fragment>
            }

            if ( word.match(/\n$/)?.length ) return <Fragment key={index}>{word}<br/></Fragment> 

            return word+' '
          })        
        }</p> 

  
    }</li>
  )
}
