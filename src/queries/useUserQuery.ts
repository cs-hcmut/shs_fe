import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userApi from "../apis/user.api";
import { UserQueryConfig } from "../types/user.type";
import { OrderQueryConfig } from "../types/order.type";

const useListUsers = (qf: UserQueryConfig) => {
  return useQuery({
    queryKey: ["user", qf],
    queryFn: () => userApi.listUsers(qf),
    enabled: !!qf,
  });
};

const useGetProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => userApi.getProfile(),
  });
};

const useGetOrderList = (qf: OrderQueryConfig) => {
  return useQuery({
    queryKey: ["user-orders", qf],
    queryFn: () => userApi.getOrderList(qf),
  });
};

const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
  });
};

// ! Mutations

const useUserLogin = () =>
  useMutation({
    mutationFn: userApi.userLogin,
  });

const useCreateMultipleUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createMultipleUsers,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

const useUpdateUserById = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateUserById,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", id],
      });
    },
  });
};

const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.deleteUsers,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

const useGetProfileMutation = () => {
  return useMutation({
    mutationFn: userApi.getProfile,
  });
};

const userQuery = {
  useListUsers,
  useGetProfile,
  useGetUserById,
  useGetOrderList,
  mutation: {
    useUpdateUserById,
    useCreateMultipleUsers,
    useUserLogin,
    useDeleteUsers,
    useGetProfileMutation,
  },
};

export default userQuery;
