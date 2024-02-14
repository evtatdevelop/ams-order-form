import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from './checkbox.module.scss';

// export const Checkbox = props => {
const Checkbox = (props, ref) => {
  const { clickHandler, label, name, checked, color } = props;
  const [value, setValue] = useState(checked)
  const [timerId, setTimerId] = useState(null)

  

  const changeHandler = () => {
    setValue( !value );
    clearTimeout(timerId);
    const timer = setTimeout(() => clickHandler(!value), 500);
    setTimerId(timer);
  }

  const clear = () =>{ 
    setValue(false)
  }

  useImperativeHandle(ref, () => ({ clear }));

  let styleChbx = value ? `${styles.checkbox} ${styles.checked}` : `${styles.checkbox}`
  styleChbx = color ? `${styleChbx} ${styles[color]}` : `${styleChbx}`;

  return (
    <div className={styleChbx}>

      <input type="checkbox" id={name}
        // defaultChecked={value}
        checked={value}
        onChange={changeHandler}
      />
      <label htmlFor={name} className={styles.visualBox}></label>
      <label htmlFor={name}>{label}</label>

    </div>
  )
}

export default forwardRef(Checkbox);