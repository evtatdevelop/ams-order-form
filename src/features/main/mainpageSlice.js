import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uplodeData, getStaffbookData } from "./mainpageSliceAPI";


const initialState = {
  loading: false,
  staffbook: [],
  row_from: 1,
  row_num: 100,
  counter: 1,
  data: [],
}

export const getStaffbook = createAsyncThunk( 'mainpage/getStaffbook', async ( data ) => await getStaffbookData(data) )

export const upData  = createAsyncThunk( 'user/uplodeData', async ( data ) => await uplodeData(data) )

export const mainpageSlice = createSlice({
  name: 'mainpage',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    setCounter: (state) => {
      state.counter = state.counter + 1;
    },
  },

  extraReducers: (builder) => { builder
    
    .addCase(getStaffbook.pending, ( state ) => { state.loading = true })
    .addCase(getStaffbook.fulfilled, ( state, action ) => {
      if ( state.staffbook.length < state.counter * state.row_num ) state.staffbook = [...state.staffbook, ...action.payload];
      state.row_from = state.staffbook.length + 1
      state.loading = false;
    })

    .addCase(upData.pending, ( state ) => { state.loading = true })
    .addCase(upData.fulfilled, ( state, action ) => {
      state.loading = false;
      state.data = [];
    })
  }
});

export const { addData, setCounter } = mainpageSlice.actions;

export const data = ( state ) => state.mainpage.data;
export const loading  = ( state ) => state.mainpage.loading;
export const row_from  = ( state ) => state.mainpage.row_from;
export const row_num  = ( state ) => state.mainpage.row_num;
export const counter  = ( state ) => state.mainpage.counter;
export const staffbook  = ( state ) => state.mainpage.staffbook;

export default mainpageSlice.reducer;
