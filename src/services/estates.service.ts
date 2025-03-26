import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import estateApi from "src/apis/estate.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { EstateModel } from "src/types/estate/estate.type";

export const ESTATE_KEY = "estates";

// ! get
const useListEstatesOfUser = (
  options?: Omit<
    UseQueryOptions<SuccessReponse<EstateModel[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<EstateModel[]>, Error>({
    queryKey: [ESTATE_KEY],
    queryFn: () => estateApi.listEstatesOfUser().then((res) => res.data),
    ...options,
  });
};

const EstateServices = {
  queries: { useListEstatesOfUser },
  create: {},
  update: {},
  delete: {},
};
export default EstateServices;
