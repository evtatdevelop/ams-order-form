import React from "react";
import styles from './levels.module.scss';
import { useSelector } from "react-redux";
import { levelsData, } from "../../../corpsystemsSlice";
import { WindowInput } from "../../../../components/windowInput/windowInput";
import { getContractorsData } from "../../../corpsystemsSliceAPI";

export const Levels = () => {
  const levels = useSelector(levelsData);

  return (
    <ul>
      { levels.map((item, index) => <li key={index}>
        <WindowInput 
          inputHandler = { val => console.log(val) }
          placeholder = {item.name}
          winContentFunc = {getContractorsData}
          content = {contractorList}
          search = {['name', 'inn']}
        />
      </li>)}
    </ul>
  )
}

const contractorList = (value) => 
  <div className={styles.contractors}>
    <div className={styles.list}>
      {value.data ? value.data.map(item => <div key={item.id} itemID={item.id}>{`${item.name} (${item.inn})`}</div>) : null}
    </div>
  </div>
