import { SuccessReponse } from "src/types/_commons/common.type";
import { EstateModel } from "src/types/estate/estate.type";
import http from "src/utils/http.util";

const url = "/estates";

const estateApi = {
  // ! get
  listEstatesOfUser(userId: string) {
    return http.get<SuccessReponse<EstateModel[]>>(`${url}/all/${userId}`);
  },
};

export default estateApi;
