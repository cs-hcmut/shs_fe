import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { Schedule_CreateBody } from "src/types/schedule/schedule.create.type";
import { ScheduleModel } from "src/types/schedule/schedule.type";
import { Schedule_UpdateDto } from "src/types/schedule/schedule.update.type";
import http from "src/utils/http.util";

const url = "/schedules";

const scheduleApi = {
  // ! post
  createSchedule(body: Schedule_CreateBody) {
    return http.post<SuccessReponse<ScheduleModel>>(`${url}`, body);
  },

  // ! get
  listAllSchedules() {
    return http.get<SuccessReponse<ScheduleModel[]>>(`${url}`);
  },

  getScheduleById(id: IDType) {
    return http.get<SuccessReponse<ScheduleModel>>(`${url}/${id}`);
  },

  // ! put
  updateSchedule(dto: Schedule_UpdateDto) {
    const { body, id } = dto;
    return http.put<SuccessReponse<ScheduleModel>>(`${url}/${id}`, body);
  },

  // ! delete
  deleteSchedule(id: IDType) {
    return http.delete<SuccessReponse<string>>(`${url}/${id}`);
  },
};

export default scheduleApi;
