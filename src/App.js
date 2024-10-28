import React, { useEffect, useState } from 'react';
import './App.scss';
import { MainPage } from './features/main/mainpage';
import { useSelector, useDispatch } from "react-redux";
import { loading, langLoading, getRemote } from './features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import { Loader } from './features/loader/loader';
import { pathBase } from './config';
import { Corpsystems } from './features/corpsystems/corpsystems';
import ExpirationScreen from './features/expirationScreen';
import { LoadPage } from './features/loadPage/loadPage';
import { StatusPage } from './features/statusPage/statusPage';

function App() {
  const load = useSelector(loading);
  const langLoad = useSelector(langLoading);
  const dispatch = useDispatch();
  
  const [expired, onExpired] = useState(false);

  useEffect(() => { 
    dispatch(getRemote());

    setTimeout(() => { onExpired(true); document.body.style.overflow = "hidden"}, 12*60*60*1000)
  }, [dispatch, ]);

  return (
    expired 
    ? <ExpirationScreen/>
    : load
      ? <LoadPage/>
      : <div className="App">
        <Routes>
          {/* <Route path={`${pathBase}/`} exact element={<MainPage/>}/> 
          <Route path={`${pathBase}/corpsystems/`} element={<MainPage/>}/>
          <Route path={`${pathBase}/corpsystems/:system`} element={<Corpsystems/>}/>
          <Route path={`${pathBase}/status`} element={<StatusPage/>}/> */}

          <Route path={`${pathBase}/`} > 
            <Route path={`/`} element={<MainPage/>}/>
            <Route path={`corpsystems/`} element={<Corpsystems/>}/>
            <Route path={`corpsystems/:system`} element={<Corpsystems/>}/>
            <Route path={`status`} element={<StatusPage/>}/>
            <Route path={`status/:system`} element={<StatusPage/>}/>
            <Route path={`status/:system/:id`} element={<StatusPage/>}/>
          </Route>
        </Routes>
        { langLoad ? <Loader/> : null }
      </div>
  );
}

export default App;
