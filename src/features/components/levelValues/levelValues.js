import React, {useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import styles from './levelValues.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import { levelValues } from "../../corpsystems/corpsystemsSliceAPI";
import { user } from "../../user/userSlice";
import { sessionKeyData, userData, corpSyst, roleSendboxData, processLevel} from "../../corpsystems/corpsystemsSlice";
import Input from "../../components/input/Input";
import { ValueRow } from "./valueRow/valueRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const LevelValues = (props, ref) => {
  const insideref = useRef(null)
  // const {name, asz05_id, inputHandler, inputClear, placeholder, multiple_select, parent } = props
  const {name, asz05_id, placeholder, multiple_select, parent } = props
  
  const dispatch = useDispatch();
  const { api_key, id} = useSelector(user);
  const orderUser = useSelector(userData);
  const roleSendbox = useSelector(roleSendboxData);
  const corpSystem = useSelector(corpSyst);
  const dark = useSelector(darkTheme);
  const sessionKey = useSelector(sessionKeyData);
  
  const [show, setShow] = useState(false);
  const [values, setValues] = useState([]);
  const [filtr, setfiltr] = useState([]);
  const [refers, setRefers] = useState(1); 

  const [value, setValue] = useState([]);
  const [backUp, setBackUp] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [visual, setVisual] = useState('');

  useEffect(() => {
    if ( !parent
         || ( parent && roleSendbox.levels?.find(item => item.asz05_id === parent)?.changed )
    ) {
      // console.log(`get level values for ${asz05_id}`);
      levelValues({ 
        api_key: api_key,
        asz05_id: asz05_id,
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
      }).then((values) => {
        setValues(values);
        setfiltr(values);
        setRefers(getDataLength(values));
      });
    } 
  }, [api_key, asz05_id, corpSystem.asz22_id, corpSystem.sapSystem.asz00_id, id, orderUser.id, parent, roleSendbox.cnt, roleSendbox.levels, roleSendbox.processGroup.name, roleSendbox.role.code, roleSendbox.role.id, sessionKey]);



  const showWin = () => {
    // inputClear();

    setBackUp(value);

    if ( value.length ) {
      console.log('need to CLEAR VALUEs for this level', asz05_id);
      console.log('need to SAVE VALUEs for SUB levels');      
    }


    values.length 
    ? setShow(true)
    : console.log('noData');
  }





  // const handleLevel = newLvl => {
  //   let newLevels = []; 
    // if ( hereLevels.find(item => item.asz05_id === newLvl.asz05_id) )
    //   newLevels = [...hereLevels.filter(item => item.asz05_id !== newLvl.asz05_id), newLvl];
    // else newLevels = [...hereLevels, newLvl];
    // dispatch(setRole({...role, levels: newLevels }));
    // dispatch(processLevel({api_key, asz06_ids: newLvl.val, event: 'mkSessionLevels', session_key: sessionKey, blk_id: role.cnt, asz03_id: role.role.id, asz05_id: newLvl.asz05_id, removed: newLvl.removed }));
    // setHereLevels(newLevels);
  // }

  // const clearLevel = asz05_id => { 
  //   if ( !asz05_id ) return;
  //   console.log("clear", asz05_id);

  //   const valForRemove = [asz05_id];
  //   const getRmValue = () => {

  //   }

  //   // //todo const removed = role.levels?.find(item => item.asz05_id === asz05_id)?.val;
  //   // //todo console.log(removed);
  //   // //todo if ( removed?.length ) dispatch(processLevel({api_key, asz05_id, removed: removed, event: 'rmSessionLevels', session_key: sessionKey, blk_id: role.cnt, }));
    
  //   // if ( role.levels?.find(item => item.asz05_id === asz05_id) ) {
  //   //   const children = role.levels.filter(item=> item.parent === asz05_id);
  //   //   console.log('children', children);   
  //   //   if ( children.length ) children.map(child => clearLevel(child.asz05_id))   
  //   // }

  //   // console.log('left level', role.levels?.filter(item => item.asz05_id !== asz05_id) );
  //   // dispatch(setRole({...role, levels: role.levels?.filter(item => item.asz05_id !== asz05_id) })); 
  // }














  const saveValueSet = () => {

    if ( !value.length ) return;

    const removed = backUp.filter(before => !value.map(after => after).includes(before));
    const added = value.filter(after => !backUp.map(before => before).includes(after));

    console.log('backUp', backUp);
    console.log('removed', removed);
    console.log('added', added);

    if ( removed.length ) {
      console.log('needed to DEL values from SandBox'); 
      console.log('needed to REMOVE SUB LEVELS for removed levels');

      console.log('needed to call DBProcessLevel - rmSessionLevels');
    }
    
    if ( added.length ) {
      console.log('needed to ADD values to SandBox');
      // dispatch(setRole({...role, levels: newLevels }));

      console.log('needed to call DBProcessLevel - mkSessionLevels');
      const newLvl = {asz05_id, val: value, changed: false, removed, parent};
      dispatch(processLevel({api_key, asz06_ids: newLvl.val, event: 'mkSessionLevels', session_key: sessionKey, blk_id: roleSendbox.cnt, asz03_id: roleSendbox.role.id, asz05_id: newLvl.asz05_id, removed: newLvl.removed }));      
    }

    // inputHandler({val: value, changed: false, removed, parent});
    
    setIsChanged(false);
    setVisual( getVisualValue() );   
    setBackUp([]);
    clearFiler();
    setShow(false);
  };


  const cancel = () => {
    if ( isChanged ) setValue(backUp);
    setBackUp([]);
    setIsChanged(false);
    clearFiler();
    setShow(false);

    console.log('need to RENEW VALUEs for this level', asz05_id);
    console.log('need to RENEW VALUEs for SUB level');
  }
 



  
  const getCheckValue = itemId => value.find(item => item === itemId); 

  const setCheck = id => {
    if ( !isChanged ) {
      // setBackUp(value);
      setIsChanged(true);      
    }

    const gitValueById = id => values.find(item => item.id === id);

    if ( gitValueById(id).multiple_select === 'ONE_VALUE' ) setValue([id])
    else  if ( value.find(item => item === id) ) setValue(value.filter(item => item !== id))
          else setValue([...value, id]);
  }

  const checkAll = () => {
    if ( !isChanged ) {
      // setBackUp(value);
      setIsChanged(true);      
    }
    if ( !filtr.filter(item => !value.includes(item.id)).length )                 //? All filtered ones are contained in the “value”.
      setValue( value.filter(val => !filtr.map(item => item.id).includes(val)) )  //? Remove all filtered ones are contained from the “value”. 
    else setValue( [...new Set([...value, ...filtr.map(item => item.id)])] );     //? Add all filtered and not exists ones to “value”.
  }

  const getVisualValue = () => value.map(id => values.find(item => item.id === id).code ).join(', ');

  const clearInput = () => {
    setValue([]);
    setBackUp([]);
    setIsChanged(false);
    setVisual('');


    // inputClear();
  }

  const onInput = val => {
  }




  const styleClnBtn = value.length ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`

  useImperativeHandle(ref, () => ({ clearInput }));

  const filter = str => {
    str.trim() 
    ? setfiltr(values.filter(item => item.code.toUpperCase().includes(str.trim().toUpperCase()) || item.value.toUpperCase().includes(str.trim().toUpperCase())))
    : setfiltr(values);    
  }

  const clearFiler = () => {
    setfiltr(values)
  };

  const codeWith = refers[0] === 'value' 
    ? Math.floor(100 / (refers[1] + 1)) 
    : Math.floor(100*refers[1] / (refers[1] + 1));
  const displayCode = refers[0] === 'value' && refers[1] === 'full' ? 'none' : 'flex';  
  const displayValue = refers[0] === 'code' && refers[1] === 'full' ? 'none' : 'flex';

  const selectInputStyle = dark 
  ? `${styles.selectInput} ${styles.dark}`
  : `${styles.selectInput}`

  const stylesChecklAllStyle = filtr.filter(item => value.includes(item.id)).length //? there're checked
  ? filtr.length !== filtr.filter(item => value.includes(item.id)).length           //? not all filtred are checked
    ? `${styles.checklAll} ${styles.notAll}`
    : `${styles.checklAll} ${styles.all}`
  : `${styles.checklAll}`

  return (
    values.length
      ? <div className={selectInputStyle}>
          <div className={styles.inputWrapper}>
            <input type="text" className={styles.htmInput}
              value={ visual }
              onInput={e => onInput(e.target.value)}
              placeholder = {placeholder}
              ref={insideref}
              onFocus={() => showWin()}
            />
            
            {<button type="button" 
                className={styleClnBtn}
                onClick={() => clearInput()}
                aria-label="Clear"
                >&times;</button>
            }      
          </div>

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
                    
                    { multiple_select === 'MULTIPLE_VALUES'
                      ? <button type="button" className={stylesChecklAllStyle} onClick={() => checkAll()}>
                          <FontAwesomeIcon icon={ faCheck } className={styles.faCheck} />
                        </button>
                      : null  
                    }
                  </div>
                  <div className={styles.headCode} style={{width: `${codeWith}%`, display: `${displayCode}`}}>Code</div>
                  <div className={styles.headName} style={{display: `${displayValue}`}}>Value</div>
                </div>

                <ul className={styles.main}>
                  { filtr.map((item, index) => 
                    <ValueRow 
                      key={index}
                      item={item}
                      refers={refers}
                      check={getCheckValue(item.id)}
                      setCheck = {setCheck}
                    />) 
                  }
                </ul>

                <footer className={styles.footer}>
                  <button type="button"
                    onClick={() => saveValueSet()}
                  >Ok</button>
                  <button type="button"
                    onClick={() => cancel()}
                  >Cancel</button>
                </footer>
              </div>
            : null
          }
        </div>

      : 'loading'

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