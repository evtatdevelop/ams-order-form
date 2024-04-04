import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from './selectTree.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";

const SelectTree = (props, ref) => {
  const {selectHandler, selectClear, placeholder, selectList, val, name} = props
  const [value, setValue] = useState(val ? val : "")
  const [show, setShow] = useState(false);
  const dark = useSelector(darkTheme);
  
  const onChange = item => {
    setValue(item.name.split(' / ').at(-1));
    selectHandler({id: `${item.id}`, name: item.name.split(' / ').at(-1)})
    setShow(false)
  }
  // const onBlur = () => setTimeout(()=>setShow(false), 100)
  const onBlur = () => {}
  const clearInput = () => {
    setValue('')
    selectClear('')
  }

  useImperativeHandle(ref, () => ({ clearInput }));

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const wrapperListStyle = show ? `${styles.wrapperList} ${styles.showSelectList}` : `${styles.wrapperList} ${styles.hideSelectList}`

  const selectInputStyle = dark 
  ? `${styles.selectTree} ${styles.dark}`
  : `${styles.selectTree}`;

  // console.log(Array.from(selectList));

  const ItemList = (list, lvl) =>  {
    return(
      <ul className={styles.selectList}>
      {list.map(item => 
        <li key={`${item.id}${name}`} className={styles.itemLi}>
          <div className={styles.itemControl}>
            { item.sub.length
              ? <label htmlFor={`${item.id}name${lvl}`} className={styles.subSwitcherLabel}>{`+`}</label>
              // ? <button type="button" onClick={()=>setShow(!show)}>btn</button>
              : null  
            }
            <input type="radio" value={item.id} id={`${item.id}${name}`} name={`name}`} onClick={()=>onChange(item)} />
            <label htmlFor={`${item.id}${name}`}>{item.name.split(' / ').at(-1)}</label>            
          </div>

          { item.sub.length
            ? <>
                <input type="checkbox" name={`name${lvl}`} className={styles.subSwitcher} id={`${item.id}name${lvl}`}/>
                <div className={styles.sub}>{ItemList(item.sub, lvl+1)}</div>
              </>
            : null  
          }
        </li>
      )}
    </ul>
    )
  }

  return (
    <div className={selectInputStyle}>
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
      <div className={wrapperListStyle}>
        { ItemList(selectList, 1) }
      </div>
      
    </div>
  )
}

export default forwardRef(SelectTree);