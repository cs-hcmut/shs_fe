import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import statsApi from "src/apis/stats.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { StatsListParams } from "src/types/stats/stats.params";
import { PowerUsage, StatsModel } from "src/types/stats/stats.type";

export const STATS_KEY = "stats";
export const POWER_USAGE_KEY = "power-usages";

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

const useGetPowerUsage = (
  params: StatsListParams,
  options?: Omit<
    UseQueryOptions<SuccessReponse<PowerUsage[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<PowerUsage[]>, Error>({
    queryKey: [POWER_USAGE_KEY, params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return statsApi
        .getPowerUsage({
          ...params,
        })
        .then((res) => res.data);
    },
    ...options,
  });
};

const StatsServices = {
  queries: { useGetStats, useGetPowerUsage },
  create: {},
  update: {},
  delete: {},
};
export default StatsServices;
