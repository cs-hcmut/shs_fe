import { SuccessReponse } from "src/types/_commons/common.type";

import { StatsListParams } from "src/types/stats/stats.params";
import { PowerUsage, StatsModel } from "src/types/stats/stats.type";
import http from "src/utils/http.util";

const url = "/stats";

const statsApi = {
  // ! get
  getStats(params: StatsListParams) {
    return http.get<SuccessReponse<StatsModel[]>>(`${url}`, { params });
  },

  getPowerUsage(params: StatsListParams) {
    return http.get<SuccessReponse<PowerUsage[]>>(`${url}/power-consumption`, {
      params,
    });
  },

  // ! post

  // ! Update
};

export default statsApi;
