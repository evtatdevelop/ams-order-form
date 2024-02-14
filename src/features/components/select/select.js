import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from './select.module.scss';

// export const Select = props => {
const Select = (props, ref) => {
  const {selectHandler, selectClear, placeholder, selectList, val, name} = props
  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false)
  const onChange = item => {
    setValue(item.name);
    selectHandler(item.id)
    setShow(false)
  }
  const onBlur = () => setTimeout(()=>setShow(false), 100)
  const clearInput = () => {
    setValue('')
    selectClear('')
  }

  useImperativeHandle(ref, () => ({ clearInput }));

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleSelectList = show ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  return (
    <div className={styles.select}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          readOnly={true}
          onClick={()=>setShow(true)}
          onFocus={()=>setShow(true)}
          onBlur={()=>onBlur()}
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>
      <ul className={styleSelectList}>
        {selectList.map(item => 
          <li key={`${item.id}${name}`} className={styles.itemLi}>
            <input type="radio" 
              value={item.id} 
              id={`${item.id}${name}`} 
              name={name}
              onClick={()=>onChange(item)}
            /><label htmlFor={`${item.id}${name}`}>{item.name}</label>
          </li>
        )}
      </ul>
    </div>
  )
}

export default forwardRef(Select);