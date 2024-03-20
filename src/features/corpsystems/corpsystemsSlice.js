import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sessionKey, companies } from "./corpsystemsSliceAPI";
import { getUserData } from "../user/userSliceAPI";

const initialState = {
  loading: false,
  system: null,
  sessionKey: null,
  user: {},
  userDataLoading: false,
  companyList: [],
  branchList: [],
  departmentLiist: [],

}

export const getSessionKey = createAsyncThunk( 'corpsystem/getSessionKey', async ( data ) => await sessionKey(data) )
export const getUserId = createAsyncThunk( 'mainpage/getUserId', async ( data ) => await getUserData(data) )
export const getCompanies = createAsyncThunk( 'corpsystem/getCompanies', async ( data ) => await companies(data) )

export const corpsystemSlice = createSlice({
  name: 'corpsystems',
  initialState,
  reducers: {
    setSystem: (state, action) => {
      state.system = action.payload;
    },

  },

  extraReducers: (builder) => { builder
    .addCase(getSessionKey.pending, ( state ) => { state.loading = true })
    .addCase(getSessionKey.fulfilled, ( state, action ) => {
      state.sessionKey = action.payload;
      state.loading = false;
    })

    .addCase(getUserId.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getUserId.fulfilled, ( state, action ) => {
      state.user = { ...action.payload };
      state.userDataLoading = false;
    })

    .addCase(getCompanies.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getCompanies.fulfilled, ( state, action ) => {
      state.companyList = [ ...action.payload ];
      state.userDataLoading = false;
    })
  }
});

export const { setSystem } = corpsystemSlice.actions;

export const corpSyst  = ( state ) => state.corpsystems.system;
export const userDataLoading  = ( state ) => state.corpsystems.userDataLoading;
export const userData  = ( state ) => state.corpsystems.user;
export const companyListData  = ( state ) => state.corpsystems.companyList;
export const branchListData  = ( state ) => state.corpsystems.branchList;
export const departmentLiistData  = ( state ) => state.corpsystems.departmentLiist;

export default corpsystemSlice.reducer;
