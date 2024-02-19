import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import mainpageReducer from '../features/main/mainpageSlice';
import sapReducer  from '../features/sap/sapSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mainpage: mainpageReducer,
    sap: sapReducer
  },
});