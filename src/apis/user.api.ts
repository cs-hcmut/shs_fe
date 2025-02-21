import http from "../utils/http.util";
import { UserLogin, UserModel } from "../types/user.type";

const url = "/v1/user";

const userApi = {
  userLogin(body: UserLogin) {
    return http.post<string>(`${url}/login`, body);
  },
  getProfile() {
    return http.get<UserModel>(`${url}`);
  },

  getMe() {
    return http.get<UserModel>(`${url}`);
  },
};

export default userApi;
