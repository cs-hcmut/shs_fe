import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import paymentApi from "../apis/payment.api";

const useGetPaymentById = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["payment"],
    queryFn: () => paymentApi.getPaymentById(orderId as string),
    enabled: Boolean(orderId),
  });
};

// ! Mutations
const useCreatePaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentApi.createPayment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["payment"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
};

const PaymentQuery = {
  useGetPaymentById,
  mutation: {
    useCreatePaymentMutation,
  },
};

export default PaymentQuery;
