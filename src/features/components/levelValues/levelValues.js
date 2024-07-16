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
import Input from "../../components/input/Input";
import { ValueRow } from "./valueRow/valueRow";


const LevelValues = (props, ref) => {
  const insideref = useRef(null)
  const {name, asz05_id, inputHandler, inputClear, placeholder, val } = props

  const { api_key, id} = useSelector(user);
  const orderUser = useSelector(userData);

  const roleSendbox = useSelector(roleSendboxData);
  const corpSystem = useSelector(corpSyst);
 
  const [show, setShow] = useState(false);
  const [values, setValues] = useState([]);
  const [filtr, setfiltr] = useState([]);
  const [refers, setRefers] = useState(1);
  
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
      asz03_code: roleSendbox.role.code
     }).then((value) => {
      setValues(value);
      setfiltr(value);
      setRefers(getDataLength(value));
    });
  }, [api_key, asz05_id, corpSystem.asz22_id, corpSystem.sapSystem.asz00_id, id, orderUser.id, roleSendbox.cnt, roleSendbox.processGroup.name, roleSendbox.role.code, roleSendbox.role.id, sessionKey]);

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

  // console.log(values);

  const filter = str => str.trim() 
    ? setfiltr(values.filter(item => item.code.toUpperCase().includes(str.trim().toUpperCase()) || item.value.toUpperCase().includes(str.trim().toUpperCase())))
    : setfiltr(values);
  
  const clearFiler = () => setfiltr(values);

  const codeWith = refers[0] === 'value' 
    ? Math.floor(100 / (refers[1] + 1)) 
    : Math.floor(100*refers[1] / (refers[1] + 1));
  const displayCode = refers[0] === 'value' && refers[1] === 'full' ? 'none' : 'flex';  
  const displayValue = refers[0] === 'code' && refers[1] === 'full' ? 'none' : 'flex';


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
            <Input 
              inputHandler = { val => filter(val) }
              inputClear = { () => clearFiler() }
              placeholder = 'Search'
              val = ''
            />

            <div className={styles.tableHead}>
              <div className={styles.headCheck}>
                <button type="button" className={styles.checklAll} 
                  onClick={() => console.log('checkAll')}
                />
              </div>
              <div className={styles.headCode} style={{width: `${codeWith}%`, display: `${displayCode}`}}>Code</div>
              <div className={styles.headName} style={{display: `${displayValue}`}}>Value</div>
              {/* <div className={styles.scrolGap} ></div> */}
            </div>

            <ul className={styles.main}>
              {/* { values.map((value, index) => <ValueRow key={index} item={value} refers={refers}/>) } */}
              { filtr.map((value, index) => <ValueRow key={index} item={value} refers={refers}/>) }
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

const getDataLength = values => {
  if ( !values.length ) return ['value', 1];

  const data = values.reduce((res, curr) => { return {
    count: ++res.count,
    sum: { code: res.sum.code + curr.code.length, value: res.sum.value + curr.value.length }
  }}, {sum: {code: 0, value: 0}, count: 0});

  if ( !data.sum.value ) return ['code', 'full'];
  if ( !data.sum.code ) return ['value', 'full'];

  const refers = (data.sum.value/data.count) / (data.sum.code/data.count);
  return refers > 1 ? ['value', Math.floor(refers)] : ['code', Math.floor(1/refers)];
}


export default forwardRef(LevelValues);