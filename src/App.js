import React, { useEffect, useState } from 'react';
import './App.scss';
import { MainPage } from './features/main/mainpage';
import { useSelector, useDispatch } from "react-redux";
import { loading, langLoading, getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import { Loader } from './features/loader/loader';
import { testMode, root } from './config';
import { Corpsystems } from './features/corpsystems/corpsystems';
import ExpirationScreen from './features/expirationScreen';
import { LoadPage } from './features/loadPage/loadPage';

function App() {
  const load = useSelector(loading);
  const langLoad = useSelector(langLoading);
  const dispatch = useDispatch();
  
  const [expired, onExpired] = useState(false);

  useEffect(() => { 
    dispatch(getRemote());

    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch, ]);

  const _pathBase = testMode ? '' : `/${root}`;

  return (
    expired 
    ? <ExpirationScreen/>
    : load
      ? <LoadPage/>
      : <div className="App">
        <Routes>
          <Route path={`${_pathBase}/`} exact element={<MainPage/>}/> 
          <Route path={`${_pathBase}/corpsystems/`} element={<MainPage/>}/>
          <Route path={`${_pathBase}/corpsystems/:system`} element={<Corpsystems/>}/>
        </Routes>
        { langLoad ? <Loader/> : null }
      </div>
  );
}

export default App;
