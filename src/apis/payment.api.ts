import { PaymentCreate, PaymentModel } from "../types/payment.type";
import http from "../utils/http.util";

const url = "/v1/Payment";

const paymentApi = {
  createPayment(body: PaymentCreate) {
    return http.post<PaymentModel>(url, body);
  },
  getPaymentById(id: string) {
    return http.get<PaymentModel>(`${url}/${id}`);
  },
};

export default paymentApi;
