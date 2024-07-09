import React, {useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import styles from './levelValues.module.scss';
import { useSelector } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import { levelValues } from "../../corpsystems/corpsystemsSliceAPI";
import { user } from "../../user/userSlice";
import { sessionKeyData } from "../../corpsystems/corpsystemsSlice";
import { userData } from "../../corpsystems/corpsystemsSlice";
import { roleSendboxData } from "../../corpsystems/corpsystemsSlice";
import { corpSyst } from "../../corpsystems/corpsystemsSlice";


const LevelValues = (props, ref) => {
  const insideref = useRef(null)
  const {name, asz05_id, inputHandler, inputClear, placeholder, val } = props

  const { api_key, id} = useSelector(user);
  const orderUser = useSelector(userData);

  const roleSendbox = useSelector(roleSendboxData);
  const corpSystem = useSelector(corpSyst);
 
  const [show, setShow] = useState(false);
  const [values, setValues] = useState([]);
  
  const [value, setValue] = useState(val ? val : "");
  const [timerId, setTimerId] = useState(null);
  const dark = useSelector(darkTheme);
  const sessionKey = useSelector(sessionKeyData);


  // console.log(orderUser);

  useEffect(() => {
    levelValues({ 
      api_key: api_key,
      asz05_id: asz05_id, //9115
      skey: sessionKey,
      cnt: roleSendbox.cnt,
      app12_id_author: id, 
      app12_id: orderUser.id, 
      asz03_id: roleSendbox.role.id,
      order_type: 'ADD_PRIVS',
      asz00_id: corpSystem.sapSystem.asz00_id,
      asz22_id: corpSystem.asz22_id,
      process_group: roleSendbox.processGroup.name,
      asz03_code: 'Z_PM_TEST'
     }).then((value) => {
      // console.log(value);
      setValues(value);
    });
  }, []);

  const onInput = val => {
    setValue(val);
    clearTimeout(timerId);
    const timer = setTimeout(() => inputHandler(val), 500);
    setTimerId(timer);
  }
  const clearInput = () => {
    clearTimeout(timerId);
    setValue(val);
    inputClear();
    insideref.current.focus();
  }

  const styleClnBtn = value ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`

  useImperativeHandle(ref, () => ({ clearInput }));

  const selectInputStyle = dark 
  ? `${styles.selectInput} ${styles.dark}`
  : `${styles.selectInput}`

  return (
    <div className={selectInputStyle}>
      <input type="text" className={styles.htmInput}
        value={value}
        onInput={e => onInput(e.target.value)}
        placeholder = {`> ${placeholder}`}
        ref={insideref}

        onFocus={() => setShow(true)}
      />
      
      {<button type="button" className={styleClnBtn}
          onClick={() => clearInput()}
          aria-label="Clear"
          >&times;</button>
      }

      { show
        ? <div className={styles.window}>
            <header className={styles.header}>{name}</header>
            <ul className={styles.main}>
              {values.map((value, index) => <li key={index}>{value.value}</li>)}
            </ul>
            <footer className={styles.footer}>
              <button type="button"
                onClick={() => setShow(false)}
              >Ok</button>
              <button type="button"
                onClick={() => setShow(false)}
              >Cancel</button>
            </footer>
          </div>
        : null
      }
      

    </div>
  )
}

export default forwardRef(LevelValues);