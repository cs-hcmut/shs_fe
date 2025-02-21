import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import orderApi from "../apis/order.api";

const useGetOrderById = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderApi.getOrderById(orderId as string),
    enabled: Boolean(orderId),
  });
};

// ! Mutations

const useCreateOrderMutation = (orderId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["order", orderId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart", orderId],
      });
    },
  });
};

const useUpdateOrderMutation = (orderId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderApi.updateOrder,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order", orderId],
      });
    },
  });
};

const OrderQuery = {
  useGetOrderById,
  mutation: {
    useCreateOrderMutation,
    useUpdateOrderMutation,
  },
};

export default OrderQuery;
