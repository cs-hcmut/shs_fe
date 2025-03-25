import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import roomApi from "src/apis/room.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { RoomModel } from "src/types/room/room.type";

export const ROOM_KEY = "rooms";

// ! get
const useListRooms = (
  userId: IDType,
  options?: Omit<
    UseQueryOptions<SuccessReponse<RoomModel[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<RoomModel[]>, Error>({
    queryKey: [ROOM_KEY, userId],
    queryFn: () => roomApi.listRooms(userId).then((res) => res.data),
    ...options,
  });
};

const RoomServices = {
  queries: { useListRooms },
  create: {},
  update: {},
  delete: {},
};
export default RoomServices;
