import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sessionKey, companies, branches, departments, sapBranch, locations, corpsystem } from "./corpsystemsSliceAPI";
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
  locationLiist: [],
  positionInput: false,

}

export const getSessionKey  = createAsyncThunk( 'corpsystem/getSessionKey', async ( data ) => await sessionKey(data) );
export const getUserId      = createAsyncThunk( 'mainpage/getUserId', async ( data ) => await getUserData(data) );
export const getCompanies   = createAsyncThunk( 'corpsystem/getCompanies', async ( data ) => await companies(data) );
export const getBranches    = createAsyncThunk( 'corpsystem/getBranches', async ( data ) => await branches(data) )
export const getDepartments = createAsyncThunk( 'corpsystem/getDepartments', async ( data ) => await departments(data) );
export const getSapBranch   = createAsyncThunk( 'corpsystem/getSapBranch', async ( data ) => await sapBranch(data) );
export const getLocations   = createAsyncThunk( 'corpsystem/getLocations', async ( data ) => await locations(data) );
export const getCorpsystem  = createAsyncThunk( 'corpsystem/getCorpsystem', async ( data ) => await corpsystem(data) );

export const corpsystemSlice = createSlice({
  name: 'corpsystems',
  initialState,
  reducers: {
    setSystem: (state, action) => {
      state.system = action.payload;
    },
    setCompany: (state, action) => {
      // state.user.company = {...action.payload};
      if ( action.payload.id && action.payload.name )
        state.user.company = {'hrs01_id': action.payload.id, 'name': action.payload.name};
      else state.user.company = []
    },
    setBranch: (state, action) => {
      // state.user.branch = {...action.payload};
      if ( action.payload.id && action.payload.name )
        state.user.branch = {'hrs05_id': action.payload.id, 'name': action.payload.name};
      else state.user.branch = []
    },
    setDepartment: (state, action) => {
      // state.user.department = {...action.payload};
      if ( action.payload.id && action.payload.name )
        state.user.department = {'app22_id': action.payload.id, 'name': action.payload.name};
      else state.user.department = []
    },
    setLocation: (state, action) => {
      state.user.location = action.payload.name;
    },
    setPosition: (state, action) => {
      state.user.position_name = action.payload;
      state.positionInput = true;
    },
    unSetPosition: (state) => {
      state.user.position_name = null;
      state.positionInput = false;
    },
    unSetSapBranch: (state) => {
      state.user.sap_branch = {};
    },
    unsetDepartmentList: (state) => {
      state.departmentLiist = [];
    },
    unsetBrancList: (state) => {
      state.branchList = [];
    },
    unsetCompanyList: (state) => {
      state.companyList = [];
    },
    unsetLocationList: (state) => {
      state.locationLiist = [];
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
      state.companyList = [];
      state.branchList = [];
      state.departmentLiist = [];
      state.locationLiist = [];
      state.user = { ...action.payload };
      state.userDataLoading = false;
    })

    .addCase(getCompanies.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getCompanies.fulfilled, ( state, action ) => {
      const companyList = [ ...action.payload ];
      // if ( companyList.length === 1 ) state.user.company = {...companyList[0]};
      if ( companyList.length === 1 ) state.user.company = {'hrs01_id': companyList[0].id, 'name': companyList[0].name}
      else state.companyList = companyList;
      state.userDataLoading = false;
    })

    .addCase(getBranches.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getBranches.fulfilled, ( state, action ) => {
      const branchList = [ ...action.payload ];
      // if ( branchList.length === 1 ) state.user.branch = {...branchList[0]}
      if ( branchList.length === 1 ) state.user.branch = {'hrs05_id': branchList[0].id, 'name': branchList[0].name}
      else state.branchList = branchList;
      state.userDataLoading = false;
    })

    .addCase(getDepartments.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getDepartments.fulfilled, ( state, action ) => {
      const departmentLiist = [ ...action.payload ];
      // if ( departmentLiist.length === 1 ) state.user.department = {...departmentLiist[0]}
      if ( departmentLiist.length === 1 ) state.user.department = {'app22_id': departmentLiist[0].id, 'name': departmentLiist[0].name}
      else state.departmentLiist = departmentLiist;
      state.userDataLoading = false;
    })

    .addCase(getLocations.pending, ( state ) => { state.userDataLoading = true;
    })
    .addCase(getLocations.fulfilled, ( state, action ) => {
      const locationLiist = action.payload;
      if ( locationLiist.length === 1 ) state.user.location = locationLiist[0].name
      else state.locationLiist = locationLiist;
      state.userDataLoading = false;
    })

    .addCase(getSapBranch.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getSapBranch.fulfilled, ( state, action ) => {
      state.user.sap_branch = { ...action.payload };
      state.userDataLoading = false;
    })

    .addCase(getCorpsystem.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getCorpsystem.fulfilled, ( state, action ) => {
      state.system = {...action.payload}
      state.userDataLoading = false;
    })
  }
});

export const { setSystem, setCompany, setBranch, setDepartment, setLocation, setPosition, unSetPosition,
  unSetSapBranch, unsetDepartmentList, unsetBrancList, unsetCompanyList, unsetLocationList } = corpsystemSlice.actions;

export const corpSyst             = ( state ) => state.corpsystems.system;
export const userDataLoading      = ( state ) => state.corpsystems.userDataLoading;
export const userData             = ( state ) => state.corpsystems.user;
export const companyListData      = ( state ) => state.corpsystems.companyList;
export const branchListData       = ( state ) => state.corpsystems.branchList;
export const departmentLiistData  = ( state ) => state.corpsystems.departmentLiist;
export const locationLiistData    = ( state ) => state.corpsystems.locationLiist;
export const positionInputData    = ( state ) => state.corpsystems.positionInput;

export default corpsystemSlice.reducer;
