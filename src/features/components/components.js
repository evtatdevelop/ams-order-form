import React from "react";
import styles from './components.module.scss';

import Input from "./input";
import Select from "./select";
import SelectInput from "./selectInput";
import InputDate from "./inputDate";
import DateInterval from "./dateInterval";
// import WindowInput from "./windowInput";

// import { getContractorsData } from "../workplace/workplaceSliceAPI";
// import { getServersData } from "../resources/resourcesSliceAPI";

export const Components = () => {

  const onWork = val => {
    // if ( typeof(val) === 'object') 

    console.log(`${val}`)
  }

  return (
    <section className={styles.components}>

      <main className={styles.componentList}>
        <Input 
          inputHandler = { val => onWork(val) }
          inputClear = { () => {} }
          placeholder = 'Input'
          val = ''
        />

        <Select
          selectHandler = { val => onWork(val) }
          selectClear  = { val => onWork(val) }
          placeholder = 'Select'
          selectList = {[{'id':1, 'name': 'one'}, {'id':2, 'name': 'two'}, {'id':3, 'name': 'three'}, {'id':4, 'name': 'four'}, {'id':5, 'name': 'five'}, {'id':6, 'name': 'six'}, {'id':7, 'name': 'seven'}, {'id':8, 'name': 'eight'}, ]}
          val = ''
          name='TestSelect'
        />

        <SelectInput
          selectHandler = { val => onWork(val) }
          placeholder = 'Employee search'
          val = ''
          name='TestSelectInput'
        />

        <div className={styles.fieldBox}>
           <InputDate
              dateHandler = { val => onWork(val) }
              lang='ru'
            />
           <InputDate
              dateHandler = { val => onWork(val) }
              lang='en'
            />
        </div>

        <DateInterval 
          dateHandler = { val => onWork(val) }
          dateClear = { val => onWork(val) }
          lang='en'
        />

        {/* <div className={styles.fieldBox}>
          <WindowInput 
            inputHandler = { val => onWork(val) }
            placeholder = 'Contractors'
            winContentFunc = {getContractorsData}
            content = {contractorList}
            search = {['name', 'inn']}
          />
          <WindowInput 
            inputHandler = { val => onWork(val) }
            placeholder = 'Servers'
            winContentFunc = {getServersData}
            content= {serverList}
            search = {['server_name', 'place_name', 'group_name', 'app12_system_fio', 'app12_boss_fio']}
          />
        </div> */}

      </main>
    </section>
  )
}


// const contractorList = (value) => 
//   <div className={styles.contractors}>
//     <div className={styles.list}>
//       {value.data ? value.data.map(item => <div key={item.id} itemID={item.id}>{`${item.name} (${item.inn})`}</div>) : null}
//     </div>
//   </div>


// const serverList = (value) => 
//   <div className={styles.servers}>
//     <div className={styles.columns}>
//       {value.columns ? value.columns.map((item, index) => <div key={index} style={{width: `${item.width}%`}}>{item.name}</div>) : null} 
//     </div>
//     <div className={styles.list}>
//       {value.data 
//         ? value.data.map(item => <div className={styles.row} key={item.id} itemID={item.id}>
//             <div style={{width: `${value.columns[0].width}%`}} itemID={item.id}>{`${item.server_name }`}</div>
//             <div style={{width: `${value.columns[1].width}%`}} itemID={item.id}>{`${item.place_name }`}</div>
//             <div style={{width: `${value.columns[2].width}%`}} itemID={item.id}>{`${item.server_type_name }`}</div>
//             <div style={{width: `${value.columns[3].width}%`}} itemID={item.id}>{`${item.group_name }`}</div>
//             <div style={{width: `${value.columns[4].width}%`}} itemID={item.id}>{`${item.app12_system_fio }`}</div>
//             <div style={{width: `${value.columns[5].width}%`}} itemID={item.id}>{`${item.app12_boss_fio }`}</div>
//           </div>) 
//         : null}
//     </div>
//   </div>
