import React from "react";
import styles from './fieldset.module.scss';

export const Fieldset = props => {
  const { legend } = props

  return (
    <fieldset className={styles.fieldset}>
      <legend>{legend}</legend>
      {props.children}
    </fieldset>
  )
}
