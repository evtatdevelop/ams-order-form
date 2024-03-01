import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import mainpageReducer from '../features/main/mainpageSlice';
import corpsystemsReducer  from '../features/corpsystems/corpsystemsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainpage: mainpageReducer,
    corpsystems: corpsystemsReducer
  },
});