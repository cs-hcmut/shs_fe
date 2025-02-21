import { useContext } from "react";
import PathBar from "../../components/_common/PathBar";
import mainPath from "../../constants/path";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/utils";
import { setCartProductListToLS } from "../../utils/order.util";
import CartItem from "./CartItem";
import { OrderContext } from "../../contexts/order.context";
import UserCartQuery from "../../queries/cart.query";
import { AppContext } from "../../contexts/app.context";
import { useQuery } from "@tanstack/react-query";
import cartApi from "../../apis/cart.api";
import classNames from "classnames";

export default function CartPage() {
  const { profile } = useContext(AppContext);
  const { extendCartProducts } = useContext(CartContext);
  const { setOrderList } = useContext(OrderContext);

  // ! HANDLE CHECKOUT
  const handleCheckout = () => {
    // Store the cart items to LS and pass them to the order context
    setCartProductListToLS(extendCartProducts);
    setOrderList(extendCartProducts);
  };

  // ! Check cart
  const { data: userCartData } = UserCartQuery.useGetCart(profile?.id);
  const { data: checkCartData, error: checkCartError } = useQuery({
    queryKey: ["check-cart-data", userCartData?.data.cart_id],
    queryFn: () =>
      cartApi.checkCanPurchaseCartAndCalcuateTotal(
        userCartData?.data.cart_id as string
      ),
    enabled: Boolean(userCartData),
    staleTime: 1000 * 60 * 3,
  });
  const totalAmount = checkCartData?.data.total;

  return (
    <div className="bg-lightBg py-2 pb-12 duration-200 dark:bg-darkBg tablet:py-3 tablet:pb-16 desktop:py-4 desktop:pb-20">
      <div className="container space-y-6">
        <PathBar pathList={[{ pathName: "cart", url: mainPath.cart }]} />

        <div className="mt-2 rounded-md border border-black/40 bg-lightColor900 dark:border-white/40 dark:bg-darkColor900">
          <div className="">
            <div className="grid grid-cols-6 rounded-sm px-8 py-4 text-base uppercase text-darkText dark:text-lightText desktop:text-lg">
              <div className="col-span-2">
                <p className="line-clamp-1 flex-grow items-center justify-center truncate text-center font-medium text-darkText dark:text-lightText">
                  Product
                </p>
              </div>
              <div className="col-span-1 overflow-hidden text-center">
                Price
              </div>
              <div className="col-span-1 overflow-hidden text-center">
                Quantity
              </div>
              <div className="col-span-1 overflow-hidden text-center">
                Subtotal
              </div>
              <div className="col-span-1 overflow-hidden text-center">
                Action
              </div>
            </div>
            <div className="mx-4 my-2 h-[400px] overflow-y-auto rounded-md bg-lightColor700 shadow outline outline-1 outline-black/40 dark:bg-darkColor700 dark:outline-white/40">
              {extendCartProducts.length > 0 ? (
                extendCartProducts?.map((cartProduct) => (
                  <div
                    key={cartProduct.id}
                    className="border-b border-black/60 last:border-none hover:bg-lightColor900/60 dark:border-white/60 dark:hover:bg-darkColor900/60"
                  >
                    <CartItem cartProduct={cartProduct} />
                  </div>
                ))
              ) : (
                <div className="relative flex h-full flex-col space-y-6 py-4">
                  <div className="relative h-full w-full">
                    <img
                      src="/images/emptyCart.png"
                      alt="Empty cart"
                      className="absolute left-0 top-0 h-full w-full object-scale-down"
                    />
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <Link
                      to={mainPath.store}
                      className="rounded-2xl bg-unhoveringBg px-4 py-2 font-semibold text-darkText hover:bg-hoveringBg tablet:px-6"
                    >
                      Go to store
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {checkCartError && (
            <div className="bg-red-100 text-red-800 w-full py-6 px-4">
              <h3 className="text-lg font-semibold">
                {"Cart is unable to create order"}
              </h3>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <p>{(checkCartError as any).response.data.message}</p>
            </div>
          )}
          <div className="grid grid-cols-6 items-center justify-between rounded-sm px-8 py-4">
            <div className="col-span-2 grid grid-cols-3">
              <div className="col-span-3 flex items-center text-center text-darkText dark:text-lightText">
                {`${extendCartProducts.length} item${extendCartProducts.length > 1 ? "s" : ""} in cart`}
              </div>
            </div>

            <div className="col-span-4 grid grid-cols-4 items-center">
              <div className="col-span-1"></div>
              <div className="col-span-1 items-center text-right font-medium uppercase text-darkText dark:text-lightText">
                Total:
              </div>
              <span className="col-span-1 text-center text-base font-medium text-haretaColor dark:text-haretaColor desktop:text-lg">
                ${formatCurrency(totalAmount || 0)}
              </span>
              <Link
                onClick={handleCheckout}
                to={mainPath.placeOrder}
                className={classNames(
                  "col-span-1 flex h-10 items-center justify-center rounded-md border-none font-medium",
                  {
                    "bg-unhoveringBg text-black hover:bg-primaryColor":
                      totalAmount !== undefined,
                    "bg-gray-400 text-gray-600 pointer-events-none cursor-not-allowed":
                      totalAmount === undefined, // Disable if totalAmount is undefined
                  }
                )}
              >
                Go to order page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
