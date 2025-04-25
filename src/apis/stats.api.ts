import { SuccessReponse } from "src/types/_commons/common.type";

import { StatsListParams } from "src/types/stats/stats.params";
import { StatsModel } from "src/types/stats/stats.type";
import http from "src/utils/http.util";

const url = "/stats";

const statsApi = {
  // ! get
  getStats(params: StatsListParams) {
    return http.get<SuccessReponse<StatsModel[]>>(`${url}`, { params });
  },

  // ! post

  // ! Update
};

export default statsApi;
