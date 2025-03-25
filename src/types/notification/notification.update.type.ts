import { IDType } from "../_commons/id.type";
import { Notification_Status } from "./notification.type";

export interface Notification_UpdateBody {
  status: Notification_Status;
}

export interface Notification_UpdateDto {
  id: IDType;
  body: Notification_UpdateBody;
}
