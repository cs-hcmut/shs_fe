import http from "../utils/http.util";
import { UserLogin } from "../types/user/user.type";

const url = "/auth";

const userApi = {
  userLogin(body: UserLogin) {
    return http.post<{
      message: string;
      token: string;
    }>(`${url}/login`, body);
  },
};

export default userApi;
