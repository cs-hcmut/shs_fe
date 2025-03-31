import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { EstateDetail, EstateModel } from "src/types/estate/estate.type";
import http from "src/utils/http.util";

const url = "/estates";

const estateApi = {
  // ! get
  listEstatesOfUser() {
    return http.get<SuccessReponse<EstateModel[]>>(`${url}/all`);
  },

  getEstateDetail(estateId: IDType) {
    return http.get<SuccessReponse<EstateDetail>>(`${url}/${estateId}`);
  },
};

export default estateApi;
