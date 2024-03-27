import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

export const sessionKey = ( data ) => service.getResource(`${_apiBase}/?q=sessionKey`, data.api_key);

export const companies    = ( data ) => service.getResource(`${_apiBase}/?q=companies&company_group=${data.company_group}`, data.api_key);
export const branches     = ( data ) => service.getResource(`${_apiBase}/?q=branches&hrs01_id=${data.hrs01_id}`, data.api_key);
export const departments  = ( data ) => service.getResource(`${_apiBase}/?q=departments&hrs05_id=${data.hrs05_id}`, data.api_key);
export const sapBranch    = ( data ) => service.getResource(`${_apiBase}/?q=sapBranch&app22_id=${data.app22_id}`, data.api_key);
export const locations    = ( data ) => service.getResource(`${_apiBase}/?q=locations&hrs05_id=${data.hrs05_id}`, data.api_key);

// export const uploadFile = ( data ) => service.uploadFile(`${_apiBase}/?q=uploadfile`, data);
// export const uplodeData = ( data ) => service.postResource(`${_apiBase}/?q=staffdata`, data);

// export const getMainpageData = ( api_key ) => offline 
//   ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/mainpage`, api_key) : service.getResource(`http://localhost:3000/mainpageen`, api_key)
//   : service.getResource(`${_apiBase}/?q=mainpage`, api_key);

// export const addPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=addprefers`, data);
// export const delPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=delprefers`, data);