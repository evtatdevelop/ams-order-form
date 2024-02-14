import React, { useState, useEffect, useRef } from 'react';
import styles from './windowInput.module.scss';
import { TestLoader } from './testLoader';

export const WindowInput = (props) => {
  const ref = useRef(null);
  const searchRef = useRef(null);

  const { inputHandler, placeholder, winContentFunc, content, search } = props;

  const [value, setValue] = useState('');
  const [showWin, setShowWin] = useState(false);
  const [loading, setloading] = useState(true);

  const [winData, setWinData] = useState(null);
  const [showData, setshowData] = useState(null);
  const [searchValue, setsSarchValue] = useState('');

  useEffect(() => {
    winContentFunc({ api_key: 'TatarenkoEG' }).then((value) => {
      setWinData(value);
      setshowData(value);
      setloading(false);
    });
  }, [winContentFunc]);

  const clearInput = () => {
    setValue('');
    ref.current.focus();
  };

  
  const onFocus = () => setShowWin(true);

  const winCloser = () => {
    setShowWin(false);
    setsSarchValue('');
    setshowData(winData);
  };

  const clearSearch = () => {
    setsSarchValue('');
    setshowData(winData);
    searchRef.current.focus();
  };

  const onSearch = (searchValue) => {
    setsSarchValue(searchValue);
    if (searchValue) setshowData(searhing(searchValue));
    else setshowData(winData);
  };

  const searhing = (searchValue) => {
    if (!searchValue) return winData;
    let filtrded = [];
    winData.data.map((item) =>
      search.map((serchItem) =>
        item[serchItem] && !filtrded.includes(item)
          ? item[serchItem].toUpperCase().includes(searchValue.toUpperCase())
            ? filtrded.push(item)
            : false
          : false
      )
    );
    return { columns: winData.columns, data: filtrded };
  };

  const setChoice = (item) => {
    inputHandler(item.id)
    setValue(item[search[0]])
    setShowWin(false)

  }

  const onChoose = (itemId) => {
    winData.data.map(item => item.id === itemId 
      ? setChoice(item) 
      : false)
  };

  const styleClnBtn = value
    ? `${styles.clearBtn} ${styles.showClnBtn}`
    : `${styles.clearBtn}`;
  const stylesModalWrapper = showWin
    ? `${styles.modalWrapper} ${styles.showWindow}`
    : `${styles.modalWrapper} ${styles.hideWindow}`;
  const styleLoading = loading
    ? `${styles.loading} ${styles.showLoading}`
    : `${styles.loading}`;
  const styleClnSearchBtn = searchValue
    ? `${styles.styleClnSearchBtn} ${styles.showClnBtn}`
    : `${styles.clearBtn}`;

  return (
    <div className={styles.windowInput}>
      <input
        type='text'
        className={styles.htmInput}
        value={value}
        placeholder={placeholder}
        ref={ref}
        readOnly={true}
        // onFocus={() => onFocus()}
        onClick={() => onFocus()}
      />
      {
        <div className={styleLoading}>
          <TestLoader />
        </div>
      }
      {
        <button
          type='button'
          className={styleClnBtn}
          onClick={() => clearInput()}
          aria-label='Clear'
        >
          &times;
        </button>
      }
      <div className={stylesModalWrapper}>
        <div className={styles.window}>
          <header className={styles.windowHead}>
            <h1 className={styles.windowName}>{placeholder}</h1>
            <button
              type='button'
              className={styles.windowCloser}
              onClick={() => winCloser()}
            >
              &times;
            </button>
          </header>

          <div className={styles.search}>
            <input
              type='text'
              placeholder='Search'
              value={searchValue}
              onInput={(e) => onSearch(e.target.value)}
              ref={searchRef}
            />
            <button
              type='button'
              className={styleClnSearchBtn}
              onClick={() => clearSearch()}
              aria-label='Clear Search'
            >
              &times;
            </button>
          </div>

          <main
            className={styles.winMain}
            onClick={(e) => onChoose(e.target.getAttribute('itemId'))}
          >
            {winData ? content(showData) : <TestLoader />}
          </main>
        </div>
      </div>
    </div>
  );
};
