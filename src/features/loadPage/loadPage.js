import React from "react";
import styles from './loadPage.module.scss';

export const LoadPage = () => {
  return (
    <div className={styles.loadPage}>
      <div>
        {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"> */}
        <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g transform="translate(26.833333333333332,26.833333333333332)">
            <rect x="-19.5" y="-19.5" width="39" height="39" fill="#4ca69d">
              <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1700000000000002;1" begin="-0.3s"></animateTransform>
            </rect>
          </g>
          <g transform="translate(73.16666666666667,26.833333333333332)">
            <rect x="-19.5" y="-19.5" width="39" height="39" fill="#2663c5">
              <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1700000000000002;1" begin="-0.2s"></animateTransform>
            </rect>
          </g>
          <g transform="translate(26.833333333333332,73.16666666666667)">
            <rect x="-19.5" y="-19.5" width="39" height="39" fill="#fa5815">
              <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1700000000000002;1" begin="0s"></animateTransform>
            </rect>
          </g>
          <g transform="translate(73.16666666666667,73.16666666666667)">
            <rect x="-19.5" y="-19.5" width="39" height="39" fill="#956490">
              <animateTransform attributeName="transform" type="scale" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="1.1700000000000002;1" begin="-0.1s"></animateTransform>
            </rect>
          </g>
        </svg>
      </div>

      <header>
        <div>application</div>
        <div>management system</div>
      </header>
    </div>
  )
}