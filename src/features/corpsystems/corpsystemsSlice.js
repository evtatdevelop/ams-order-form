import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sessionKey, companies, branches, departments, sapBranch, locations, corpsystem, 
  systemList, subSystemList, processGroups, getParam, roles, levels } from "./corpsystemsSliceAPI";
import { getUserData } from "../user/userSliceAPI";

const initialState = {
  loading: false,
  userDataLoading: false,
  subSystemLoading: false,
  positionInput: false,


  system: null,
  sessionKey: null,
  user: {},
  roles: [],

  params: {
    enable_subsystems: null,
  },

  companyList: [],
  branchList: [],
  departmentLiist: [],
  locationLiist: [],
  systemList: [],
  subSystemList: [],
  processGroupList: [],
  roleList: [],
  
  roleAdder: false,
  roleSendbox: {},
  levels: [],
}

export const getSessionKey    = createAsyncThunk( 'corpsystem/getSessionKey', async ( data ) => await sessionKey(data) );
export const getUserId        = createAsyncThunk( 'mainpage/getUserId', async ( data ) => await getUserData(data) );
export const getCompanies     = createAsyncThunk( 'corpsystem/getCompanies', async ( data ) => await companies(data) );
export const getBranches      = createAsyncThunk( 'corpsystem/getBranches', async ( data ) => await branches(data) )
export const getDepartments   = createAsyncThunk( 'corpsystem/getDepartments', async ( data ) => await departments(data) );
export const getSapBranch     = createAsyncThunk( 'corpsystem/getSapBranch', async ( data ) => await sapBranch(data) );
export const getLocations     = createAsyncThunk( 'corpsystem/getLocations', async ( data ) => await locations(data) );
export const getCorpsystem    = createAsyncThunk( 'corpsystem/getCorpsystem', async ( data ) => await corpsystem(data) );
export const getSystemList    = createAsyncThunk( 'corpsystem/getSystemList', async ( data ) => await systemList(data) );
export const getSubSystemList = createAsyncThunk( 'corpsystem/getSubSystemList', async ( data ) => await subSystemList(data) );
export const getProcessGroups = createAsyncThunk( 'corpsystem/getProcessGroups', async ( data ) => await processGroups(data) );
export const getGetParam      = createAsyncThunk( 'corpsystem/getGetParam', async ( data ) => await getParam(data) );
export const getRoles         = createAsyncThunk( 'corpsystem/getRoles', async ( data ) => await roles(data) );
export const getLevels        = createAsyncThunk( 'corpsystem/getLevels', async ( data ) => await levels(data) );

export const corpsystemSlice = createSlice({
  name: 'corpsystems',
  initialState,
  reducers: {
    // setSystem: (state, action) => { state.system = {...action.payload, sapSystem: {}}; },
    setCompany: (state, action) => {
      if ( action.payload.id && action.payload.name ) state.user.company = {'hrs01_id': action.payload.id, 'name': action.payload.name};
      else state.user.company = []
    },
    setBranch: (state, action) => {
      if ( action.payload.id && action.payload.name ) state.user.branch = {'hrs05_id': action.payload.id, 'name': action.payload.name};
      else state.user.branch = []
    },
    setDepartment: (state, action) => {
      if ( action.payload.id && action.payload.name ) state.user.department = {'app22_id': action.payload.id, 'name': action.payload.name};
      else state.user.department = []
    },
    setLocation: (state, action) => { state.user.location = action.payload.name; },
    setPosition: (state, action) => {
      state.user.position_name = action.payload;
      state.positionInput = true;
    },
    setBoss: (state, action) => { state.user.boss = action.payload; }, //! moveto user

    setSapSystem: (state, action) => { 
      state.system.sapSystem = {...action.payload, asz00_id: action.payload.id, subSapSystem: {} }
      // state.sapSystem = {...action.payload, asz00_id: action.payload.id }
      delete state.system.sapSystem.id;
      state.system.sapSystem.subSapSystem = {};
      state.subSystemList = [];

    },
    setSabSapSystem: (state, action) => {
      state.system.sapSystem.subSapSystem = {...action.payload, asz80_id: action.payload.id}
      delete state.system.sapSystem.id;
    },


    unSetPosition: (state) => {
      state.user.position_name = null;
      state.positionInput = false;
    },
    unSetSapBranch: (state) => { state.user.sap_branch = {}; },
    unsetDepartmentList: (state) => { state.departmentLiist = []; },
    unsetBrancList: (state) => { state.branchList = []; },
    unsetCompanyList: (state) => { state.companyList = []; },
    unsetLocationList: (state) => { state.locationLiist = []; },
    unSetSapSystem: (state) => { 
      state.system.sapSystem = {};
      state.subSystemList = [];
      state.processGroupList = [];
      state.roleList=[];
      state.roles = [];
    },
    unSetSabSapSystem: (state) => {
      state.system.sapSystem.subSapSystem = {};
      state.processGroupList = [];
      state.roleList=[];
      state.roles = [];
    },
    clearForm: (state) => {
      state.user.boss = null;
      state.system.sapSystem = {};
      state.subSystemList = [];
      state.processGroupList = [];
      state.roleList = [];
      state.roles = [];
    },
    
    showRoleAdder: (state, action) => {
      state.roleAdder = action.payload
    },

    addRole: (state, action) => {
      state.roles = [...state.roles, action.payload]
    },
    rmRole: (state, action) => {
      state.roles = [...state.roles.filter(item => item.role.id !== action.payload)]
    },

    // temep data

    setRole: (state, action) => {
      state.roleSendbox = {...action.payload}
    },

    clearLevels: (state) => {
      state.levels = []
    }
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
      state.user = { ...action.payload, boss: null };
      state.userDataLoading = false;
    })

    .addCase(getCompanies.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getCompanies.fulfilled, ( state, action ) => {
      const companyList = [ ...action.payload ];
      if ( companyList.length === 1 ) state.user.company = {'hrs01_id': companyList[0].id, 'name': companyList[0].name}
      else state.companyList = companyList;
      state.userDataLoading = false;
    })

    .addCase(getBranches.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getBranches.fulfilled, ( state, action ) => {
      const branchList = [ ...action.payload ];
      if ( branchList.length === 1 ) state.user.branch = {'hrs05_id': branchList[0].id, 'name': branchList[0].name}
      else state.branchList = branchList;
      state.userDataLoading = false;
    })

    .addCase(getDepartments.pending, ( state ) => { state.userDataLoading = true })
    .addCase(getDepartments.fulfilled, ( state, action ) => {
      const departmentLiist = [ ...action.payload ];
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
      state.system = {...action.payload, sapSystem: {}}
      state.userDataLoading = false;
    })

    .addCase(getSystemList.pending, ( state ) => { state.loading = true })
    .addCase(getSystemList.fulfilled, ( state, action ) => {
      state.systemList = [...action.payload];
      state.loading = false;
    })

    .addCase(getSubSystemList.pending, ( state ) => { state.subSystemLoading = true })
    .addCase(getSubSystemList.fulfilled, ( state, action ) => {
      state.subSystemList = [...action.payload];
      state.subSystemLoading = false;
    })

    .addCase(getGetParam.pending, ( state ) => { state.subSystemLoading = true })
    .addCase(getGetParam.fulfilled, ( state, action ) => {
      state.params.enable_subsystems = action.payload
      state.subSystemLoading = false;
    })

    .addCase(getProcessGroups.pending, ( state ) => { state.subSystemLoading = true })
    .addCase(getProcessGroups.fulfilled, ( state, action ) => {
      state.processGroupList = [...action.payload]
      state.subSystemLoading = false;
    })

    .addCase(getRoles.pending, ( state ) => { state.subSystemLoading = true })
    .addCase(getRoles.fulfilled, ( state, action ) => {
      state.roleList = [...action.payload];
      state.subSystemLoading = false;
    })

    .addCase(getLevels.pending, ( state ) => { state.subSystemLoading = true })
    .addCase(getLevels.fulfilled, ( state, action ) => {
      state.levels = [...action.payload];
      state.subSystemLoading = false;
    })
  }
});

export const { setCompany, setBranch, setDepartment, setLocation, setPosition, unSetPosition,
  unSetSapBranch, unsetDepartmentList, unsetBrancList, unsetCompanyList, unsetLocationList, 
  setBoss, clearForm, setSapSystem, unSetSapSystem, setSabSapSystem, unSetSabSapSystem,
  showRoleAdder, addRole, rmRole, 
  setRole, clearLevels,
} = corpsystemSlice.actions;

export const corpSyst             = ( state ) => state.corpsystems.system;
export const userDataLoading      = ( state ) => state.corpsystems.userDataLoading;
export const userData             = ( state ) => state.corpsystems.user;
export const companyListData      = ( state ) => state.corpsystems.companyList;
export const branchListData       = ( state ) => state.corpsystems.branchList;
export const departmentLiistData  = ( state ) => state.corpsystems.departmentLiist;
export const locationLiistData    = ( state ) => state.corpsystems.locationLiist;
export const positionInputData    = ( state ) => state.corpsystems.positionInput;
export const systemListData       = ( state ) => state.corpsystems.systemList;
export const subSystemListData    = ( state ) => state.corpsystems.subSystemList;
export const subSystemLoadingData = ( state ) => state.corpsystems.subSystemLoading;
export const rolesData            = ( state ) => state.corpsystems.roles;
export const paramsData           = ( state ) => state.corpsystems.params;
export const processGroupListData = ( state ) => state.corpsystems.processGroupList;
export const roleListData         = ( state ) => state.corpsystems.roleList;
export const roleSendboxData      = ( state ) => state.corpsystems.roleSendbox;
export const levelsData           = ( state ) => state.corpsystems.levels;
export const roleAdderData        = ( state ) => state.corpsystems.roleAdder;

export default corpsystemSlice.reducer;
