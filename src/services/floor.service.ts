import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import floorApi from "src/apis/floor.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { FloorModel } from "src/types/floor/floor.type";

export const FLOOR_KEY = "floors";

// ! create
const useCreateFloor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: floorApi.addFloor,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [FLOOR_KEY],
      });
    },
  });
};

// ! get
const useListFloors = (
  userId: IDType,
  options?: Omit<
    UseQueryOptions<SuccessReponse<FloorModel[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<FloorModel[]>, Error>({
    queryKey: [FLOOR_KEY, userId],
    queryFn: () => floorApi.listFloors(userId).then((res) => res.data),
    ...options,
  });
};

// ! update
const useUpdateFloor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: floorApi.updateFloor,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [FLOOR_KEY],
      });
    },
  });
};

// ! delete
const useDeleteFloor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: floorApi.deleteFloor,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [FLOOR_KEY],
      });
    },
  });
};

const FloorServices = {
  queries: { useListFloors },
  create: { useCreateFloor },
  update: { useUpdateFloor },
  delete: { useDeleteFloor },
};
export default FloorServices;
