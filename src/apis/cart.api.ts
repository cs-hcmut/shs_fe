import http from "../utils/http.util";

import {
  CartProductModel,
  CartResponse,
  CheckCartResponse,
} from "../types/cart.type";

const useCartURL = "/v1/user/cart";

const cartApi = {
  addToCart(body: { product_id: string; quantity: number }) {
    return http.post<CartProductModel>(useCartURL, body);
  },
  getCart() {
    return http.get<CartResponse>(useCartURL);
  },

  checkCanPurchaseCartAndCalcuateTotal(cartId: string) {
    return http.get<CheckCartResponse>(
      `/v1/cart/${cartId}/check-and-calculate-total`
    );
  },
  calculatePayableAmountWithOwnerShipMemberShip(cartId: string) {
    return http.get<CheckCartResponse>(
      `/v1/cart/${cartId}/calculate-payable-amount`
    );
  },
  removeFromCart(id: string) {
    return http.delete(`${useCartURL}/${id}`);
  },
};

export default cartApi;
