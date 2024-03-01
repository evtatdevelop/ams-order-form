// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import { uplodeData, getStaffbookData } from "./sapSliceAPI";



const initialState = {
  // loading: false,
  data: [],
  system: null,
}

// export const getStaffbook = createAsyncThunk( 'corpsystem/getStaffbook', async ( data ) => await getStaffbookData(data) )

// export const upData  = createAsyncThunk( 'user/uplodeData', async ( data ) => await uplodeData(data) )

export const corpsystemSlice = createSlice({
  name: 'corpsystems',
  initialState,
  reducers: {
    setSystem: (state, action) => {
      state.system = action.payload;
    },

  },

  // extraReducers: (builder) => { builder
    
  //   .addCase(getStaffbook.pending, ( state ) => { state.loading = true })
  //   .addCase(getStaffbook.fulfilled, ( state, action ) => {
  //     if ( state.staffbook.length < state.counter * state.row_num ) state.staffbook = [...state.staffbook, ...action.payload];
  //     state.row_from = state.staffbook.length + 1
  //     state.loading = false;
  //   })

  //   .addCase(upData.pending, ( state ) => { state.loading = true })
  //   .addCase(upData.fulfilled, ( state, action ) => {
  //     state.loading = false;
  //     state.data = [];
  //   })
  // }
});

export const { setSystem } = corpsystemSlice.actions;

export const corpSyst  = ( state ) => state.corpsystems.system;

export default corpsystemSlice.reducer;
