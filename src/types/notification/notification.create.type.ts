import { Notification_Type } from "./notification.type";

export interface Notification_CreateBody {
  message: string;
  title: string;
  type: Notification_Type;
}
