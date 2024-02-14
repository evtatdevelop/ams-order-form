import React from "react";
import styles from './staffItem.module.scss';

export const StaffItem = props => {
  // const { app12_id, company_group, domain, email, first_name, lang_code, last_name, login, middle_name, phone1, position_name } = props.item
  const { app12_id, email, first_name, last_name, middle_name, } = props.item

  const styleItem = props.color ? `${styles.staffItem} ${styles[props.color]}` : `${styles.staffItem}`;

  return (
    <ul className={styleItem} key={app12_id}>
      <li>{last_name}</li>
      <li>{first_name}</li>
      <li>{middle_name}</li>
      <li>{email}</li>
    </ul>
  )
}

