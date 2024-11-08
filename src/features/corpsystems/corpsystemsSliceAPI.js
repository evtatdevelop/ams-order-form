import Service from "../../services";
import { apiBase } from "../../config";

const service = new Service();

export const sessionKey = ( data ) => service.getResource(`${apiBase}/?q=sessionKey`, data.api_key);

export const companies      = ( data ) => service.getResource(`${apiBase}/?q=companies&company_group=${data.company_group}`, data.api_key);
export const branches       = ( data ) => service.getResource(`${apiBase}/?q=branches&hrs01_id=${data.hrs01_id}`, data.api_key);
export const departments    = ( data ) => service.getResource(`${apiBase}/?q=departments&hrs05_id=${data.hrs05_id}`, data.api_key);
export const sapBranch      = ( data ) => service.getResource(`${apiBase}/?q=sapBranch&app22_id=${data.app22_id}`, data.api_key);
export const locations      = ( data ) => service.getResource(`${apiBase}/?q=locations&hrs05_id=${data.hrs05_id}`, data.api_key);
export const corpsystem     = ( data ) => service.getResource(`${apiBase}/?q=corp_system&url=${data.url}&path=${data.path}`, data.api_key);
export const systemList     = ( data ) => service.getResource(`${apiBase}/?q=system_list&asz22_id=${data.asz22_id}&instance_type=${data.instance_type}&lang=${data.lang}`, data.api_key);
export const subSystemList  = ( data ) => service.getResource(`${apiBase}/?q=subsystem_list&asz00_id=${data.asz00_id}&lang=${data.lang}`, data.api_key);
export const processGroups  = ( data ) => service.getResource(`${apiBase}/?q=process_groups&asz00_id=${data.asz00_id}&asz01_id=${data.asz01_id}&instance_type=${data.instance_type}&app12_id_author=${data.app12_id_author}&ordertype=${data.orderType}&app12_id=${data.app12_id}`, data.api_key);
export const getParam       = ( data ) => service.getResource(`${apiBase}/?q=get_param&asz22_id=${data.asz22_id}&param_code=${data.param_code}&asz00_id=${data.asz00_id}`, data.api_key);
// export const getParam       = ( data ) => service.getResource(`${apiBase}/?q=get_param&asz22_id=${data.asz22_id}`, data.api_key);
export const roles          = ( data ) => service.getResource(`${apiBase}/?q=roles&asz00_id=${data.asz00_id}&asz01_id=${data.asz01_id}&instance_type=${data.instance_type}&app12_id_author=${data.app12_id_author}&ordertype=${data.orderType}&app12_id=${data.app12_id}&asz80_id=${data.asz80_id}`, data.api_key);
export const levels         = ( data ) => service.getResource(`${apiBase}/?q=levels&lang=${data.lang}&asz03_id=${data.asz03_id}`, data.api_key);
export const levelValues    = ( data ) => service.getResource(`${apiBase}/?q=level_values&lang=${data.lang}&asz05_id=${data.asz05_id}&skey=${data.skey}&cnt=${data.cnt}&app12_id_author=${data.app12_id_author}&app12_id=${data.app12_id}&asz03_id=${data.asz03_id}&order_type=${data.order_type}&asz00_id=${data.asz00_id}&asz22_id=${data.asz22_id}&process_group=${data.process_group}&asz03_code=${data.asz03_code}`, data.api_key);
export const sandboxLevel   = ( data ) => service.updateResource(`${apiBase}/?q=sandbox_level`, data);
export const approvalRoute  = ( data ) => service.updateResource(`${apiBase}/?q=approval_route`, data);
export const submitForm     = ( data ) => service.postResource(`${apiBase}/?q=submit_form`, data);
export const guides         = ( data ) => service.getResource(`${apiBase}/?q=get_guides&form=corpsystems&system_prefix=${data.system_prefix}`, data.api_key);
