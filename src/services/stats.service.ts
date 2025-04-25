import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import statsApi from "src/apis/stats.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { StatsListParams } from "src/types/stats/stats.params";
import { StatsModel } from "src/types/stats/stats.type";

export const STATS_KEY = "stats";

// ! get
const useGetStats = (
  params: StatsListParams,
  options?: Omit<
    UseQueryOptions<SuccessReponse<StatsModel[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<StatsModel[]>, Error>({
    queryKey: [STATS_KEY, params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return statsApi
        .getStats({
          ...params,
        })
        .then((res) => res.data);
    },
    ...options,
  });
};

const DeviceServices = {
  queries: { useGetStats },
  create: {},
  update: {},
  delete: {},
};
export default DeviceServices;
