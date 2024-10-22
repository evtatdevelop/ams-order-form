import Service from "../../services";
import { apiBase } from "../../config";

const service = new Service();

export const getOrderData = ( data ) => service.getResource(`${apiBase}/?q=order&order_id=${data.ordr_id}`, data.api_key);  //ToDo: ordr_id (asz31_id || session_key)
