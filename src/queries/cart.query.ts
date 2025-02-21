import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cartApi from "../apis/cart.api";

const useGetCart = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => cartApi.getCart(),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 3,
  });
};

// ! Mutations

const useAddToCart = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["check-cart-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-cart-payment"],
      });
    },
  });
};

const useRemoveFromCart = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });
};

const UserCartQuery = {
  useGetCart,
  mutation: {
    useAddToCart,
    useRemoveFromCart,
  },
};

export default UserCartQuery;
