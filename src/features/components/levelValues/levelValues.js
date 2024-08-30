import React, {useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import styles from './levelValues.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { darkTheme } from "../../main/mainpageSlice";
import { levelValues } from "../../corpsystems/corpsystemsSliceAPI";
import { user } from "../../user/userSlice";
import { sessionKeyData, userData, corpSyst, roleSendboxData, processLevel, setLevelsValue, unSetLevelsValue, editSandBoxData, } from "../../corpsystems/corpsystemsSlice";
import Input from "../../components/input/Input";
import { ValueRow } from "./valueRow/valueRow";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleInfo, } from '@fortawesome/free-solid-svg-icons'
import { DataLoader } from "./dataLoader";
import { TestLoader } from "./testLoader";
import dictionary from "../../../dictionary.json";
import { CheckBox } from "./valueRow/checkBox/checkBox";
import { showInfoData, setShowInfo, } from "../../corpsystems/corpsystemsSlice";

const LevelValues = (props, ref) => {
  const insideref = useRef(null)
  const {name, asz05_id, placeholder, multiple_select, parent, clearLevel } = props
  
  const dispatch = useDispatch();
  const { api_key, id, lang} = useSelector(user);
  const orderUser = useSelector(userData);
  const roleSendbox = useSelector(roleSendboxData);
  const corpSystem = useSelector(corpSyst);
  const dark = useSelector(darkTheme);
  const sessionKey = useSelector(sessionKeyData);
  const editSandBox = useSelector(editSandBoxData);
  const showInfo = useSelector(showInfoData);
  
  const [show, setShow] = useState(false);
  const [values, setValues] = useState([]);
  const [filtr, setfiltr] = useState([]);
  const [refers, setRefers] = useState(1); 

  const [value, setValue] = useState([]);
  const [backUp, setBackUp] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [visual, setVisual] = useState('');
  const [updating, setUpdating] = useState(false);
  const [showAlls, setShowAlls] = useState(false);
  const [incompleteList, setIncompleteList] = useState([]);


  useEffect(() => {
    if ( !parent
         || ( parent && roleSendbox.levels?.find(item => item.asz05_id === parent)?.changed )
    ) { setUpdating(true);
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
          setUpdating(false);

          // if ( !value.length ) setShow(true); //? outoopen window with values
        });
    } 
  }, [api_key, asz05_id, corpSystem.asz22_id, corpSystem.sapSystem.asz00_id, id, orderUser.id, parent, roleSendbox.cnt, roleSendbox.levels, roleSendbox.processGroup.name, roleSendbox.role.code, roleSendbox.role.id, sessionKey]);


  useEffect(() => {
    if ( roleSendbox.levels.length 
         &&  roleSendbox.levels.find(level => level.asz05_id === asz05_id)
    ) {
      setValue(roleSendbox.levels.find(level => level.asz05_id === asz05_id).value);
      //? the new list of values ​​no longer contains such values
      const removed = roleSendbox.levels.find(level => level.asz05_id === asz05_id).value.filter(idDelVal => !values.map(listItem => listItem.id).includes(idDelVal));
      if ( !editSandBox ) {
        if ( removed.length ) { 
          dispatch(unSetLevelsValue({asz05_id, removed }));
          dispatch(processLevel({api_key, removed, event: 'rmSessionLevels', session_key: sessionKey, blk_id: roleSendbox.cnt, asz03_id: roleSendbox.role.id, asz05_id, }));
        }
      }
      setVisual( roleSendbox.levels.find(level => level.asz05_id === asz05_id).value.map(id => values.find(item => item.id === id)?.code ).join(', ') )

    }
  }, [api_key, asz05_id, dispatch, 
    editSandBox, 
    roleSendbox.cnt, roleSendbox.levels, roleSendbox.role.id, sessionKey, values])




  const showWin = () => {
    setBackUp(value);
    values.length 
    ? setShow(true)
    : console.log('noData');
  }


  const saveValueSet = () => {
    if ( !value.length ) return;
    
    if (parent && [...new Set(values.map(item => item.code_parent))].length !== [...new Set(values.filter(item => value.includes(item.id)))].length ) {
      setIncompleteList([...new Set(values.map(item => item.code_parent))].filter(itm => ![...new Set(values.filter(item => value.includes(item.id)).map(i=>i.code_parent) )].includes(itm) ));
      dispatch(setShowInfo({showInfo: !showInfo, data: 'incomplete', }));
      return
    }
    
    const removed = backUp.filter(before => !value.map(after => after).includes(before));
    const added = value.filter(after => !backUp.map(before => before).includes(after));
    if ( removed.length ) { 
      dispatch(unSetLevelsValue({asz05_id, removed }));
      dispatch(processLevel({api_key, removed, event: 'rmSessionLevels', session_key: sessionKey, blk_id: roleSendbox.cnt, asz03_id: roleSendbox.role.id, asz05_id, }));
    }
    if ( added.length ) {
      dispatch(setLevelsValue({asz05_id, added }));
      dispatch(processLevel({api_key, added, event: 'mkSessionLevels', session_key: sessionKey, blk_id: roleSendbox.cnt, asz03_id: roleSendbox.role.id, asz05_id, removed: [] }));
    }
    setIsChanged(false);
    setBackUp([]);
    clearFiler();
    setShow(false);
    setIncompleteList([]);
  };

  const cancel = () => {
    if ( isChanged ) setValue(backUp);
    setBackUp([]);
    setIsChanged(false);
    clearFiler();
    setShow(false);
    setIncompleteList([]);
  }
 
  const setCheck = id => {    
    // dispatch(cancelEdit()); //? ...moved to DBProcessLevel
    if ( !isChanged ) setIsChanged(true);
    const val = values.find(item => item.id === id);
    if ( val.code === "ALL" ) {
      if ( value.find(item => item === id) ) setValue(value.filter(item => item !== id))
      else setValue([...value.filter(item => !values.filter(itemVal => itemVal.code_parent === val.code_parent).map(i => i.id).includes(item) ), id]);
    } else {
      if ( val.multiple_select === 'ONE_VALUE' ) setValue([id])
      else  if ( value.find(item => item === id) ) setValue(value.filter(item => item !== id))
            else setValue([...value.filter(item => !values.filter(itemVal => itemVal.code_parent === val.code_parent && itemVal.code === "ALL").map(i => i.id).includes(item) ), id]);      
    }
  }
  
  const checkAll = () => {
    if ( !isChanged ) setIsChanged(true);

    if ( filtr.filter(item => item.code === 'ALL').length ) {
      //? There're ALLs
      if ( filtr.length === values.length ) { 
        //? No Filter
        if ( showAlls ) setValue([...new Set([...values.filter(item => item.code === 'ALL').map(i=>i.id), 
          ...values.filter(otherItem => !values.filter(item => item.code === "ALL").map(i => i.code_parent).includes(otherItem.code_parent) ).map(i=>i.id)
         ])]);
        else setShowAlls(true);
      } else {
        //? whith filter
        if ( filtr.length === filtr.filter(item => item.code === 'ALL').length ) {
          //? only ALLs
          //? only depended on ALLs 
          if ( !filtr.filter(item => !value.includes(item.id)).length ) setValue( value.filter(item => values.find(i => i.id === item).code !== 'ALL' ) );  //? unSet                                
          else setValue( [ ...value.filter(itm => !filtr.map(item => item.code_parent).includes( values.find(i => i.id === itm).code_parent ) ), ...filtr.map(item => item.id)] );  //? Set   
        } else {
          //? ALLs and others       
          if ( !filtr.filter(itemVal=> itemVal.code !== 'ALL').filter(item => !value.includes(item.id)).length )
            setValue( value.filter(val => !filtr.map(item => item.id).includes(val)) )                           //? unSet
          else setValue([...new Set([ 
            ...value.filter(item => !values.filter(i => i.code === "ALL" && filtr.map(fltItm => fltItm.code_parent ).includes(i.code_parent)).map(itm => itm.id).includes(item)), //? remove all vals with code 'ALL' and code_parent included in filtred items list  
            ...filtr.filter(itemVal=> itemVal.code !== 'ALL').map(item => item.id) 
          ])]);                                                                                                 //? Set
        }
      }
    } else {
      //? No ALLs
      if ( !filtr.filter(item => !value.includes(item.id)).length )                 //? All filtered ones are contained in the “value”.
        setValue( value.filter(val => !filtr.map(item => item.id).includes(val)) )  //? Remove all filtered ones are contained from the “value”. 
      else setValue( [...new Set([
        ...value.filter(item => !values.filter(i => i.code === "ALL" && filtr.map(fltItm => fltItm.code_parent ).includes(i.code_parent)).map(itm => itm.id).includes(item)), //? remove all vals with code 'ALL' and code_parent included in filtred items list 
        ...filtr.map(item => item.id)])] );                                         //? Add all filtered and not exists ones to “value”.
    }
  }

  const checkAllAther = () => {
    if ( getCheckOterValue() ) {
      setValue(value.filter(item => values.find(itm => itm.id === item).code === 'ALL'))
    } else setValue([...new Set([ 
      ...value,
      ...values.filter(otherItem => !values.filter(item => item.code === "ALL").map(i => i.code_parent).includes(otherItem.code_parent) ).map(item => item.id) 
    ])]);
  }
  const getCheckOterValue = () => {
    return  values.filter(otherItem => !values.filter(item => item.code === "ALL").map(i => i.code_parent).includes(otherItem.code_parent) ).length
            ===
            value.filter(otherItem => !values.filter(item => item.code === "ALL").map(i => i.code_parent).includes( values.find(itm => itm.id === otherItem).code_parent  ) ).length;
  }

  const clearInput = () => {
    setValue([]);
    setBackUp([]);
    setIsChanged(false);
    setVisual('');
    if ( value.length ) clearLevel(asz05_id);
  }

  useImperativeHandle(ref, () => ({ clearInput }));

  const filter = str => {
    str.trim() 
    ? setfiltr(values.filter(item => item.code.toUpperCase().includes(str.trim().toUpperCase()) || item.value.toUpperCase().includes(str.trim().toUpperCase())))
    : setfiltr(values);    
  }

  const clearFiler = () => {
    setfiltr(values)
  };

  const getCheckValue = itemId => value.find(item => item === itemId); 

  const codeWith = refers[0] === 'value' 
    ? Math.floor(100 / (refers[1] + 1)) 
    : Math.floor(100*refers[1] / (refers[1] + 1));
  const displayCode = refers[0] === 'value' && refers[1] === 'full' ? 'none' : 'flex';  
  const displayValue = refers[0] === 'code' && refers[1] === 'full' ? 'none' : 'flex';

  const styleClnBtn = value.length ? `${styles.clearBtn} ${styles.showClnBtn}` : `${styles.clearBtn}`
  const styleLoading = updating ? `${styles.loading} ${styles.showLoading}` : `${styles.loading}`

  const selectInputStyle = dark 
  ? `${styles.selectInput} ${styles.dark}`
  : `${styles.selectInput}`

  const stylesChecklAllStyle = filtr.filter(item => value.includes(item.id)).length //? there're checked
  ? filtr.length === filtr.filter(item => value.includes(item.id)).length   //? not all filtred are checked
    ||
    value.filter(valItm=>values.filter(item=>item.code==='ALL').map(i=>i.id).includes(valItm)).length +     //? all CHECKED ALLs   
    value.filter(valItm=>values.filter(otherItem=>!values.filter(item=>item.code==="ALL").map(i=>i.code_parent).includes(otherItem.code_parent)).map(i=>i.id).includes(valItm)).length ===   //? all CHECKED not ALLs nor their children
    values.filter(item => item.code === 'ALL').map(i=>i.id).length +      //? all ALLs
    values.filter(otherItem => !values.filter(item => item.code === "ALL").map(i => i.code_parent).includes(otherItem.code_parent) ).map(i=>i.id).length    //? all not ALLs nor their children
    ? `${styles.checklAll} ${styles.all}`
    : `${styles.checklAll} ${styles.notAll}`
  : `${styles.checklAll}`


  return (
    values.length
      ? <div className={selectInputStyle}>
          <div className={styles.inputWrapper}>
            <input type="text" className={styles.htmInput}
              value={ visual }
              onInput={() => {}}
              placeholder = {placeholder}
              ref={insideref}
              onFocus={() => showWin()}
            />
            { updating
              ? <div className={styleLoading}><TestLoader/></div>
              : <button type="button" 
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
                  placeholder = {dictionary.search[lang]}
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

                  { showAlls
                    ? <li className={styles.allAllsArea}>
                      { values.filter(item => item.code === "ALL").map(item => 
                        <button key={item.id}  type="button"
                          onClick={() => setCheck(item.id)}
                        >
                          <div className={styles.visualCheck}><CheckBox check = {getCheckValue(item.id)}/></div>
                          <div>{ `${item.value}` }</div>
                        </button>)
                      }
                      { values.filter(otherItem => !values.filter(item => item.code === "ALL").map(i => i.code_parent).includes(otherItem.code_parent)).length
                        ? <button type="button"
                          onClick={() => checkAllAther()}    
                        >
                          <div className={styles.visualCheck}><CheckBox check = { getCheckOterValue() }/> </div>
                          <div>{dictionary.other_options[lang]}</div>
                        </button>
                        : null
                      }

                      <div className={styles.infoArea}>
                        <button
                          type="button"
                          className={styles.showInfoBtn} 
                          onClick={() => dispatch(setShowInfo({showInfo: !showInfo, data: 'alls', }))}
                        >
                          <FontAwesomeIcon icon={ faCircleInfo }/>  
                        </button>
                      </div>
                        
                    </li>
                    : null
                  }

                  
                  { filtr.map((item, index) => 
                    <ValueRow 
                      key={index}
                      item={item}
                      refers={refers}
                      check={getCheckValue(item.id)}
                      setCheck = {setCheck}
                      incomplete = {incompleteList.includes(item.code_parent)}
                    />) 
                  }
                </ul>

                <footer className={styles.footer}>
                  <button type="button"
                    onClick={() => saveValueSet()}
                  >{dictionary.save[lang]}</button>
                  <button type="button"
                    onClick={() => cancel()}
                  >{dictionary.cancel[lang]}</button>
                </footer>
              </div>
            : null
          }
        </div>

      : <div className={styles.loader}><DataLoader/></div>

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