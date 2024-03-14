import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sessionKey } from "./corpsystemsSliceAPI";
import { getUserData } from "../user/userSliceAPI";

const initialState = {
  loading: false,
  system: null,
  sessionKey: null,
  user: {},
}

export const getSessionKey = createAsyncThunk( 'corpsystem/getSessionKey', async ( data ) => await sessionKey(data) )
export const getUserId = createAsyncThunk( 'mainpage/getUserId', async ( data ) => await getUserData(data) )

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

    .addCase(getUserId.pending, ( state ) => {})
    .addCase(getUserId.fulfilled, ( state, action ) => {
      state.user = {...action.payload};
    })
  }
});

export const { setSystem } = corpsystemSlice.actions;

export const corpSyst  = ( state ) => state.corpsystems.system;

export default corpsystemSlice.reducer;
