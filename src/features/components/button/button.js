import React from "react";
import styles from './button.module.scss';

export const Button = props => {
  const {clickHandler, label, color, fontSize, width} = props

  const styleBtn = color ? `${styles.button} ${styles[color]}` : `${styles.button}`;
  let style = fontSize ? {fontSize: `${fontSize}px`} : {};
  style = width ? {...style, width: `${width}px`} : style;

  return (
    <div className={styleBtn}>
      <button type="button" onClick={clickHandler} style={style}>{label}</button>
    </div>
  )
}
