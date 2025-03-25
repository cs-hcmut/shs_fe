import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { Floor_CreateBody } from "src/types/floor/floor.create";
import { FloorModel } from "src/types/floor/floor.type";
import { Floor_UpdateDto } from "src/types/floor/floor.update";
import http from "src/utils/http.util";

const url = "/floors";

const floorApi = {
  // ! post
  addFloor(body: Floor_CreateBody) {
    return http.post<SuccessReponse<FloorModel>>(`${url}`, body);
  },

  // ! get
  listFloors(userId: string) {
    return http.get<SuccessReponse<FloorModel[]>>(`${url}/${userId}`);
  },

  // ! put
  updateFloor(dto: Floor_UpdateDto) {
    const { body, id } = dto;
    return http.put<SuccessReponse<FloorModel>>(`${url}/${id}`, body);
  },

  // ! delete
  deleteFloor(id: IDType) {
    return http.put<SuccessReponse<FloorModel>>(`${url}/${id}`);
  },
};

export default floorApi;
