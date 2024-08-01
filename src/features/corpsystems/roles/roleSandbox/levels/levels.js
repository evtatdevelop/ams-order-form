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
  // const { handleLevel, clearLevel } = props;

  return (
    <ul className={styles.levels}>
      { levels.map(item => 
        !item.parent || ( roleSendbox.levels?.find(level => level.asz05_id === item.parent)?.val.length )
        ? <li key={item.asz05_id} className={styles.levelRow}>
            <div className={styles.levelName}>{item.name}</div>
            { item.display_type === 'TYPE1' || !item.display_type === 'TYPE2' 
              ? <LevelValues
                  name = { item.name }
                  asz05_id = { item.asz05_id }
                  parent = { item.parent }
                  multiple_select = { item.multiple_select }
                  // inputHandler = { val => handleLevel({'asz05_id': item.asz05_id, ...val}) }
                  // inputClear = { () => clearLevel(item.asz05_id) }
                  placeholder = 'TYPE1 / TYPE2'
                  val = { [] }
                />
              : item.display_type === 'MANUAL' 
                ? <Input 
                    // inputHandler = { val => handleLevel({'asz05_id': item.asz05_id, val}) }
                    inputClear = { () => console.log(null) }
                    placeholder = 'MANUAL'
                    val = ''
                  />
                : item.display_type === 'EMPLOYEE'
                  ? <SelectInput
                      // selectHandler = { val => handleLevel({'asz05_id': item.asz05_id, val}) }
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
