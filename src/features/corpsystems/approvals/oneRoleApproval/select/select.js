import React, { useState, forwardRef, useRef, useEffect, } from "react";
import styles from './select.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../../../main/mainpageSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const Select = (props, ref) => {
  const {selectHandler, placeholder, selectList, val, name, id, editable} = props
  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false);
  const dark = useSelector(darkTheme);
  
  const inputRefs = useRef([]);

 const onChange = item => {
    setValue(item.name);
    selectHandler(item)
    setShow(false)
  }

  useEffect(() => {
    const item = selectList[0];
    setValue(item.name);
    // selectHandler(item)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const styleClnBtn = value && (editable ?? true) ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleSelectList = show && (editable ?? true) ? `${styles.selectList} ${styles.showSelectList}` : `${styles.selectList} ${styles.hideSelectList}`

  const selectInputStyle = dark 
  ? `${styles.select} ${styles.dark}`
  : `${styles.select}`

  const keyDown = (e, i, item) => {
    if ( e.code !== 'Tab' ) e.preventDefault();
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
      default:
        break;
    } 
  }


  const outClick = (e) => {
    // if ( !e.target.closest(`#optionList-${id}`) || (show && e.target.closest('.closer')) ) {
    if ( !e.target.closest(`#optionList-${id}`) && !e.target.closest('.closer') ) {
    // if ( !e.target.closest(`#optionList-${id}`) && !e.target.closest(`#closer-${id}`) ) {
      setShow(false)
      document.removeEventListener("mouseup", outClick);

      // console.log(show);
      
    }
  }

  const onShowPicker = () => {
    document.addEventListener("mouseup", outClick);
    setShow(true);
  }

  const arrowHandler = ()=> {
    setShow(!show);
    if ( !show ) {
      document.addEventListener("mouseup", outClick);
    } else {
      document.removeEventListener("mouseup", outClick);
    }
  }

  return (
    <div className={selectInputStyle}>
      <div className={styles.input}>
        <input type="text" className={styles.htmInput}
          value={value}
          placeholder = {placeholder}
          readOnly={true}
          onClick={()=>onShowPicker()}
          // onFocus={()=>onShowPicker()}
          // onClick={()=>setShow(true)}
          // onFocus={()=>setShow(true)}
          // onBlur={()=>onBlur()}
          onKeyDown={(e)=>keyDown(e, -1)}
          id={ id ?? '' }
        />
        {<button type="button" className={`${styleClnBtn} closer`} id={`#closer-${id}`}
            onClick={() => arrowHandler() }
            aria-label="open"
            > { show
                ? <FontAwesomeIcon icon={ faCaretUp } className={styles.faCaret} />
                : <FontAwesomeIcon icon={ faCaretDown } className={styles.faCaret} />
            }</button>
        }
      </div>
      <ul className={styleSelectList} id={`#optionList-${id}`}>
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