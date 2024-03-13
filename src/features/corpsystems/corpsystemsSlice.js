import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sessionKey } from "./corpsystemsSliceAPI";

const initialState = {
  loading: false,
  system: null,
  sessionKey: null,
}

export const getSessionKey = createAsyncThunk( 'corpsystem/getSessionKey', async ( data ) => await sessionKey(data) )

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

  }
});

export const { setSystem } = corpsystemSlice.actions;

export const corpSyst  = ( state ) => state.corpsystems.system;

export default corpsystemSlice.reducer;
