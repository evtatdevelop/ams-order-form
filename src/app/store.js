import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import mainpageReducer from '../features/main/mainpageSlice';
import corpsystemsReducer  from '../features/corpsystems/corpsystemsSlice';
import statuspageReducer from '../features/statusPage/statusPageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainpage: mainpageReducer,
    corpsystems: corpsystemsReducer,
    statuspage: statuspageReducer,
  },
});