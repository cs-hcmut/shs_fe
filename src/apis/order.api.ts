import http from "../utils/http.util";

import {
  OrderCreateDto,
  OrderModel,
  OrderUpdateDto,
} from "../types/order.type";

const url = "/v1/order";

const orderApi = {
  createOrder(body: OrderCreateDto) {
    return http.post<OrderModel>(url, body);
  },
  getOrderById(id: string) {
    return http.get<OrderModel>(`${url}/${id}`);
  },
  updateOrder(data: OrderUpdateDto) {
    return http.patch<OrderModel>(`${url}/${data.orderId}`, data.body);
  },
};

export default orderApi;
