import { createContext, useState } from "react";
import { ExtendCartProduct } from "../types/cart.type";

interface CartContextInterface {
  extendCartProducts: ExtendCartProduct[];
  setExtendCartProducts: React.Dispatch<
    React.SetStateAction<ExtendCartProduct[]>
  >;
}

const initialcartContext: CartContextInterface = {
  extendCartProducts: [],
  setExtendCartProducts: () => null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext =
  createContext<CartContextInterface>(initialcartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [extendCartProducts, setExtendCartProducts] = useState<
    ExtendCartProduct[]
  >(initialcartContext.extendCartProducts);

  return (
    <CartContext.Provider
      value={{
        extendCartProducts,
        setExtendCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
