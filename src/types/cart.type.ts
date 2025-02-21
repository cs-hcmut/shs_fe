import { SQLModel } from "./common.type";
import { ProductModel } from "./product.type";

export interface CartProductModel extends SQLModel {
  product: Pick<
    ProductModel,
    "id" | "name" | "image_url" | "price" | "inventory_quantity"
  >;
  quantity: number;
}

export interface ExtendCartProduct extends CartProductModel {
  disabled: boolean;
  checked: boolean;
  previousQuantity: number;
  discount: number;
}

export interface CartResponse {
  cart_id: string;
  cart_products: CartProductModel[];
}

export interface CheckCartResponse {
  total: number;
}
