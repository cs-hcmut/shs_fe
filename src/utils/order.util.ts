import { CartProductModel } from "../types/cart.type";

export const setCartProductListToLS = (orderList: CartProductModel[]) => {
  localStorage.setItem("order_list", JSON.stringify(orderList));
};

export const getCartProductListFromLS = (): CartProductModel[] => {
  const result = localStorage.getItem("order_list");
  return result ? JSON.parse(result) : [];
};
