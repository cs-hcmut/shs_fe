import { createContext, useState } from "react";
import { getCartProductListFromLS } from "../utils/order.util";
import { CartProductModel } from "../types/cart.type";

interface OrderContextInterface {
  orderList: CartProductModel[];
  setOrderList: React.Dispatch<React.SetStateAction<CartProductModel[]>>;
}

const initialOrderContext: OrderContextInterface = {
  orderList: getCartProductListFromLS(),
  setOrderList: () => null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext =
  createContext<OrderContextInterface>(initialOrderContext);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderList, setOrderList] = useState<CartProductModel[]>(
    initialOrderContext.orderList
  );

  return (
    <OrderContext.Provider
      value={{
        orderList,
        setOrderList,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
