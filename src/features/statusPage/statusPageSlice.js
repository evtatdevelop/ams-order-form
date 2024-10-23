import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderData,  } from "./statusPageSliceAPI";

const initialState = {
  loading: false,
  orderData: null,
}

export const getOrder = createAsyncThunk( 'statuspage/getOrder', async ( data ) => await getOrderData(data) );

// export const getCompanies     = createAsyncThunk( 'corpsystem/getCompanies', async ( data ) => await companies(data) );

export const statuspageSlice = createSlice({
  name: 'statuspage',
  initialState,
  reducers: {

    setSomething: (state, action) => {
      console.log(action.payload);
      
    },

  },

  extraReducers: (builder) => { builder

    .addCase(getOrder.pending, ( state ) => { state.loading = true })
    .addCase(getOrder.fulfilled, ( state, action ) => {
      state.orderData = action.payload;
      state.loading = false;
    })


  }
});

export const { setSomething, } = statuspageSlice.actions;

export const loading    = ( state ) => state.statuspage.loading;
export const orderData  = ( state ) => state.statuspage.orderData;

export default statuspageSlice.reducer;
