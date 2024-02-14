import React from "react";
import styles from './row.module.scss';

export const Row = props => {

  return (
    <div className={styles.row}>
      {props.children}
    </div>
  )
}
