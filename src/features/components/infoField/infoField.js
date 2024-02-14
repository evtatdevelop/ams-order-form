import React from "react";
import styles from './infoField.module.scss';

export const InfoField = props => {
  const {placeholder, val, readonly} = props

  const styleField = readonly ? `${styles.field} ${styles.readonly}` : `${styles.field}`

  return (
    <div className={styles.infoField}>
      <div className={styleField}>{val ? val : placeholder}</div>
    </div>
  )
}
