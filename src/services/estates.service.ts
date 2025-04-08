import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import estateApi from "src/apis/estate.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { EstateDetail, EstateModel } from "src/types/estate/estate.type";

export const ESTATE_KEY = "estates";

// ! get
const useListEstates = (
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

const useGetEstateDetail = (
  estateId: IDType,
  options?: Omit<
    UseQueryOptions<SuccessReponse<EstateDetail>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<EstateDetail>, Error>({
    queryKey: [ESTATE_KEY, estateId],
    queryFn: () => estateApi.getEstateDetail(estateId).then((res) => res.data),
    ...options,
  });
};

const EstateServices = {
  queries: { useListEstates, useGetEstateDetail },
  create: {},
  update: {},
  delete: {},
};
export default EstateServices;
