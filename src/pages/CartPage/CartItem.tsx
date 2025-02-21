import { useContext, useEffect, useState } from "react";
import { ExtendCartProduct } from "../../types/cart.type";
import { CartContext } from "../../contexts/cart.context";
import UserCartQuery from "../../queries/cart.query";
import { AppContext } from "../../contexts/app.context";
import { produce } from "immer";
import { formatCurrency, generateNameId } from "../../utils/utils";
import { Link } from "react-router-dom";
import mainPath from "../../constants/path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { classNames } from "primereact/utils";
import QuantityController from "../../components/_common/QuantityController";

interface Props {
  cartProduct: ExtendCartProduct;
}

export default function CartItem({ cartProduct }: Props) {
  const { profile } = useContext(AppContext);
  const { setExtendCartProducts } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(cartProduct.quantity);
  const [isUserChanging, setIsUserChanging] = useState(false); // Flag to track if quantity change is initiated by the user

  //! HANDLE QUANTITY
  const updateCartProductMutation = UserCartQuery.mutation.useAddToCart(
    profile?.id
  );

  const handleQuantity = (
    cartProductIndex: number,
    value: number,
    enable: boolean
  ) => {
    if (enable) {
      setExtendCartProducts(
        produce((draft) => {
          draft[cartProductIndex].disabled = true;
        })
      );
      setQuantity(value);
      setIsUserChanging(true); // Indicate that the user is changing the quantity
    }
  };

  const handleTypeQuantity = (cartProductIndex: number) => (value: number) => {
    setExtendCartProducts(
      produce((draft) => {
        draft[cartProductIndex].quantity = value;
      })
    );
  };

  useEffect(() => {
    if (!isUserChanging) return;

    const updateQuantity = setTimeout(() => {
      updateCartProductMutation.mutate(
        {
          product_id: cartProduct.product.id,
          quantity: quantity,
        },
        {
          onSettled: () => {
            setIsUserChanging(false); // Reset updating state only after mutation settles
          },
        }
      );
    }, 1000);

    return () => {
      clearTimeout(updateQuantity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, isUserChanging]);

  // ! Remove
  const removeCartProductMutation = UserCartQuery.mutation.useRemoveFromCart(
    profile?.id
  );

  const handleRemove = (productId: string) => () => {
    removeCartProductMutation.mutate(productId);
  };

  return (
    <div className="grid grid-cols-6 items-center rounded-sm p-4 text-center text-darkText first:mt-0 first:border-none dark:text-lightText">
      <div className="col-span-2">
        <div className="flex">
          <Link
            to={`${mainPath.store}/${generateNameId({
              name: cartProduct.product.name,
              id: cartProduct.product.id,
            })}`}
            className="flex flex-grow items-center"
          >
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden text-lg desktop:text-2xl">
              {cartProduct.product.image_url ? (
                <img
                  alt={cartProduct.product.name}
                  src={cartProduct.product.image_url}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-darkColor900">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </div>
              )}
            </div>
            <div className="ml-4 flex-grow overflow-hidden px-2 text-left">
              <div
                className={classNames("line-clamp-1 text-base desktop:text-lg")}
              >
                {cartProduct.product.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex items-center justify-center space-x-2">
          <p className={classNames("text-darkText dark:text-lightText", {})}>
            ${formatCurrency(cartProduct.product.price)}
          </p>
        </div>
      </div>

      <div className="col-span-1">
        <QuantityController
          max={cartProduct.product.inventory_quantity}
          value={quantity}
          classNameWrapper="flex items-center justify-center"
          onIncrease={(value) =>
            handleQuantity(
              0, // Assuming single cart product, otherwise replace with dynamic index
              value,
              value <= cartProduct.product.inventory_quantity
            )
          }
          onDecrease={(value) => handleQuantity(0, value, value >= 1)}
          setQuantity={setQuantity}
          onType={handleTypeQuantity(0)}
          onFocusOut={(value) =>
            handleQuantity(
              0,
              value,
              value >= 1 &&
                value <= cartProduct.product.inventory_quantity &&
                value !== cartProduct.previousQuantity
            )
          }
          disabled={cartProduct.disabled}
          inputClassName={classNames(
            " text-sm desktop:text-base h-8 mx-1 desktop:mx-2 w-14 rounded-lg p-1 text-center outline-none bg-white border border-black/20"
          )}
        />
      </div>

      <div className="col-span-1">
        <span className="text-haretaColor">
          $
          {formatCurrency(
            cartProduct.product.price *
              cartProduct.quantity *
              ((100 - cartProduct.discount) / 100)
          )}
        </span>
      </div>

      <div className="col-span-1">
        <button
          className="bg-none text-xs text-darkText/80 hover:text-darkText hover:underline dark:text-lightText/80 dark:hover:text-lightText desktop:text-sm"
          onClick={handleRemove(cartProduct.product.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
