import React from "react";
import styles from './loader.module.scss';
// import { useSelector } from "react-redux";
// import { loading as primeLoad } from "../primaryPage/mainpageSlice";
// import { loading as userLoad } from "../user/userSlice";

export const Loader = () => {

  // const primeload = useSelector(primeLoad);
  // const userload = useSelector(userLoad);

  return (
    <div className={styles.loader}>
    
    <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="translate(26.666666666666668,26.666666666666668)">
        <rect x="-20" y="-20" width="40" height="40" fill="#456caa">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.3s"></animateTransform>
        </rect>
      </g>
      <g transform="translate(73.33333333333333,26.666666666666668)">
        <rect x="-20" y="-20" width="40" height="40" fill="#88a2ce">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.2s"></animateTransform>
        </rect>
      </g>
      <g transform="translate(26.666666666666668,73.33333333333333)">
        <rect x="-20" y="-20" width="40" height="40" fill="#c2d2ee">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="0s"></animateTransform>
        </rect>
      </g>
      <g transform="translate(73.33333333333333,73.33333333333333)">
        <rect x="-20" y="-20" width="40" height="40" fill="#456caa">
          <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1500000000000001;1" begin="-0.1s"></animateTransform>
        </rect>
      </g>
    </svg>
    
    </div>
  )
}