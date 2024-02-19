// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import { uplodeData, getStaffbookData } from "./sapSliceAPI";


const initialState = {
  // loading: false,
  data: [],
}

// export const getStaffbook = createAsyncThunk( 'sap/getStaffbook', async ( data ) => await getStaffbookData(data) )

// export const upData  = createAsyncThunk( 'user/uplodeData', async ( data ) => await uplodeData(data) )

export const sapSlice = createSlice({
  name: 'sap',
  initialState,
  reducers: {
    // changeTheme: (state) => {
    //   state.darkTheme = !state.darkTheme;
    // },

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

// export const { changeTheme } = sapSlice.actions;

// export const loading  = ( state ) => state.sap.loading;

export default sapSlice.reducer;
