import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { Notification_CreateBody } from "src/types/notification/notification.create.type";
import { NotificationParams } from "src/types/notification/notification.params.type";
import { NotificationModel } from "src/types/notification/notification.type";
import { Notification_UpdateDto } from "src/types/notification/notification.update.type";

import http from "src/utils/http.util";

const url = "/notifications";

const notiApi = {
  // ! post
  addNotification(body: Notification_CreateBody) {
    return http.post<SuccessReponse<NotificationModel>>(`${url}`, body);
  },

  // ! get
  listNotifications(params: NotificationParams) {
    return http.get<SuccessReponse<NotificationModel[]>>(`${url}`, { params });
  },

  // ! put
  updateNotification(dto: Notification_UpdateDto) {
    const { body, id } = dto;
    return http.patch<SuccessReponse<NotificationModel>>(`${url}/${id}`, body);
  },

  // ! delete
  deleteNotification(id: IDType) {
    return http.delete<SuccessReponse<NotificationModel>>(`${url}/${id}`);
  },
};

export default notiApi;
