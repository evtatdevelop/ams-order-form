import React from "react";
import styles from './levels.module.scss';
import { useSelector } from "react-redux";
import { levelsData, roleSendboxData, } from "../../../corpsystemsSlice";
import Input from "../../../../components/input/Input";
import { SelectInput } from "../../../../components/selectInput/selectInput";
import LevelValues from "../../../../components/levelValues/levelValues";

export const Levels = props => {
  const levels = useSelector(levelsData);
  const roleSendbox = useSelector(roleSendboxData);
  const { clearLevel } = props;
  
  return (
    <ul className={styles.levels}>
      { levels.map(item => 
        !item.parent || ( roleSendbox.levels?.find(level => level.asz05_id === item.parent)?.value.length )
        ? <li key={item.asz05_id} className={styles.levelRow}>
            <div className={styles.levelName}>{item.name}</div>
            { item.display_type === 'TYPE1' || !item.display_type === 'TYPE2' 
              ? <LevelValues
                  name = { item.name }
                  asz05_id = { item.asz05_id }
                  parent = { item.parent }
                  multiple_select = { item.multiple_select }
                  placeholder = 'TYPE1 / TYPE2'
                  val = { [] }
                  clearLevel = {clearLevel}
                />
              : item.display_type === 'MANUAL' 
                ? <Input 
                    inputClear = { () => console.log(null) }
                    placeholder = 'MANUAL'
                    val = ''
                  />
                : item.display_type === 'EMPLOYEE'
                  ? <SelectInput
                      placeholder = {'EMPLOYEE'}
                      val = ''
                      name='userNameLevel'
                      mode = 'user'
                    />                       
                  : null
            }
          </li>
          
          :null
        ) 
      }
    </ul>
  )
}
