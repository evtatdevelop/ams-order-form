import React, { useState, forwardRef, useImperativeHandle, useRef, } from "react";
import styles from './select.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";

// export const Select = props => {
const Select = (props, ref) => {
  const {selectHandler, selectClear, placeholder, selectList, val, name, id, editable} = props
  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false);
  const dark = useSelector(darkTheme);
  const inputRefs = useRef([]);

 const onChange = item => {
    setValue(item.name);
    selectHandler(item)
    setShow(false)
  }
  // const onBlur = () => setTimeout(()=>setShow(false), 100)
  const onBlur = () => {}
  
  const clearInput = () => {
    setValue('')
    selectClear('')
  }

  useImperativeHandle(ref, () => ({ clearInput }));


  const styleClnBtn = value && (editable ?? true) ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleSelectList = show && (editable ?? true) ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  const selectInputStyle = dark 
  ? `${styles.select} ${styles.dark}`
  : `${styles.select}`

  const keyDown = (e, i, item) => {
    if ( e.code !== 'Tab' ) e.preventDefault();
    // console.log(e.code);
    switch ( e.code ) {
      case 'ArrowDown': 
        i = selectList.length-1 === i ? 0 : ++i;
        inputRefs.current[i]?.focus();
        break;
      case 'ArrowUp': 
        i = !i || !inputRefs.current[i] ? selectList.length-1 : --i;
        inputRefs.current[i]?.focus();
        break;
      case 'Enter': 
        if ( item ) onChange(item);
        break;
      case 'Space': onShowPicker(); break;
      case 'Escape': setShow(false); break;
      // case 'Space': setShow(true); break;
      default:
        break;
    } 
  }


  const outClick = (e) => {
    if ( !e.target.closest('#optionList') ) {
      setShow(false)
      document.removeEventListener("mouseup", outClick);
    }
  }

  const onShowPicker = () => {    
    document.addEventListener("mouseup", outClick);
    setShow(true);
  }


  return (
    <div className={selectInputStyle}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          readOnly={true}
          onClick={()=>onShowPicker()}
          onFocus={()=>onShowPicker()}
          // onClick={()=>setShow(true)}
          // onFocus={()=>setShow(true)}
          onBlur={()=>onBlur()}
          onKeyDown={(e)=>keyDown(e, -1)}
          id={ id ?? '' }
        />
        {<button type="button" className={styleClnBtn}
            onClick={() => clearInput()}
            aria-label="Clear"
            >&times;</button>
        }
      </div>
      <ul className={styleSelectList} id="optionList">
        {selectList.map((item, index) => {          
          return <li key={`${item.id}${name}`} className={styles.itemLi}>
            <input type="radio" 
              value={item.id} 
              id={`${item.id}${name}`} 
              name={name}
              onClick={()=>onChange(item)}
              ref={ input => inputRefs.current[index] = input }
              onKeyDown={(e)=>keyDown(e, index, item)}
            /><label htmlFor={`${item.id}${name}`}>{item.name}</label>
          </li>          
        }

        )}
      </ul>



    </div>
  )
}

export default forwardRef(Select);