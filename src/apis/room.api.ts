import { SuccessReponse } from "src/types/_commons/common.type";
import { RoomModel } from "src/types/room/room.type";
import http from "src/utils/http.util";

const url = "/rooms";

const roomApi = {
  // ! get
  lsitRooms(userId: string) {
    return http.get<SuccessReponse<RoomModel[]>>(`${url}/${userId}`);
  },
};

export default roomApi;
