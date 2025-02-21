import { SQLModel } from "./common.type";
import { OrderModel } from "./order.type";

export interface PaymentModel extends SQLModel {
  order: OrderModel;
  amount: number;
  currency: string;
  payment_date: Date;
}

export interface PaymentCreate
  extends Pick<PaymentModel, "amount" | "currency"> {
  order_id: string;
}
