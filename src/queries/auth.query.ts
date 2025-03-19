import { useMutation } from "@tanstack/react-query";
import userApi from "../apis/auth.api";

// ! Mutations

const useUserLogin = () =>
  useMutation({
    mutationFn: userApi.userLogin,
  });

const authQuery = {
  mutation: {
    useUserLogin,
  },
};

export default authQuery;
