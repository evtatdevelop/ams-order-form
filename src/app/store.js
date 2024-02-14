import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import mainpageReducer from '../features/main/mainpageSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainpage: mainpageReducer
  },
});