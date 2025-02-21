import { SQLModel } from "./common.type";
import { PagingQueryConfig } from "./paging.type";
import { ProductModel } from "./product.type";

export type OrderStatus =
  | "await payment"
  | "being deliveried"
  | "deliveried"
  | "received";

export interface OrderProductModel
  extends Pick<ProductModel, "name" | "image_url" | "price"> {
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface OrderCreateDto {
  user_id: string;
  address: string;
  order_products: {
    product_id: string;
    quantity: number;
    unit_price: number;
  }[];
  use_discount?: boolean;
}

export interface OrderModel extends SQLModel {
  order_date: Date;
  address: string;
  original_amount: number;
  deduct_rate: number;
  deduct_amount: number;
  remain_amount: number;
  tax: number;
  status: OrderStatus;
  user: {
    name: string;
    email: string;
  };
  order_products: OrderProductModel[];
}

export interface OrderQueryConfig extends PagingQueryConfig {
  status?: string;
  start_date?: string;
  end_date?: string;
}

export interface OrderProductUpdate {
  productId: string;
  newQuantity: number;
  isDeleted?: boolean;
}

export interface OrderUpdateDto {
  orderId: string;
  body: OrderProductUpdate[];
}
