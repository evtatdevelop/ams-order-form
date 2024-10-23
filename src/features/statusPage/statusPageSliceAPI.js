import Service from "../../services";
import { apiBase } from "../../config";

const service = new Service();

export const getOrderData = ( data ) => service.getResource(`${apiBase}/?q=get_order&order_type=${data.order_type}&order_id=${data.order_id}`, data.api_key);
