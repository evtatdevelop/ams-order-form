import Service from "../../services";
import { testMode } from "../../config";

const service = new Service();

const _apiBase = testMode 
? 'https://request.sibgenco.local/ams_api_tst'
: 'https://request.sibgenco.local/ams_api';

export const sessionKey = ( data ) => service.getResource(`${_apiBase}/?q=sessionKey`, data.api_key);

export const companies      = ( data ) => service.getResource(`${_apiBase}/?q=companies&company_group=${data.company_group}`, data.api_key);
export const branches       = ( data ) => service.getResource(`${_apiBase}/?q=branches&hrs01_id=${data.hrs01_id}`, data.api_key);
export const departments    = ( data ) => service.getResource(`${_apiBase}/?q=departments&hrs05_id=${data.hrs05_id}`, data.api_key);
export const sapBranch      = ( data ) => service.getResource(`${_apiBase}/?q=sapBranch&app22_id=${data.app22_id}`, data.api_key);
export const locations      = ( data ) => service.getResource(`${_apiBase}/?q=locations&hrs05_id=${data.hrs05_id}`, data.api_key);
export const corpsystem     = ( data ) => service.getResource(`${_apiBase}/?q=corp_system&url=${data.url}&path=${data.path}`, data.api_key);
export const systemList     = ( data ) => service.getResource(`${_apiBase}/?q=system_list&asz22_id=${data.asz22_id}&instance_type=${data.instance_type}`, data.api_key);
export const subSystemList  = ( data ) => service.getResource(`${_apiBase}/?q=subsystem_list&asz00_id=${data.asz00_id}`, data.api_key);
export const processGroups  = ( data ) => service.getResource(`${_apiBase}/?q=process_groups&asz00_id=${data.asz00_id}&asz01_id=${data.asz01_id}&instance_type=${data.instance_type}&app12_id_author=${data.app12_id_author}&ordertype=${data.orderType}&app12_id=${data.app12_id}`, data.api_key);
export const getParam       = ( data ) => service.getResource(`${_apiBase}/?q=get_param&asz22_id=${data.asz22_id}&param_code=${data.param_code}&asz00_id=${data.asz00_id}`, data.api_key);
export const roles          = ( data ) => service.getResource(`${_apiBase}/?q=roles&asz00_id=${data.asz00_id}&asz01_id=${data.asz01_id}&instance_type=${data.instance_type}&app12_id_author=${data.app12_id_author}&ordertype=${data.orderType}&app12_id=${data.app12_id}&asz80_id=${data.asz80_id}`, data.api_key);

// export const uploadFile = ( data ) => service.uploadFile(`${_apiBase}/?q=uploadfile`, data);
// export const uplodeData = ( data ) => service.postResource(`${_apiBase}/?q=staffdata`, data);

// export const getMainpageData = ( api_key ) => offline 
//   ? offlinelang === 'ru' ? service.getResource(`http://localhost:3000/mainpage`, api_key) : service.getResource(`http://localhost:3000/mainpageen`, api_key)
//   : service.getResource(`${_apiBase}/?q=mainpage`, api_key);

// export const addPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=addprefers`, data);
// export const delPrefers = ( data ) => service.updateResource(`${_apiBase}/?q=delprefers`, data);