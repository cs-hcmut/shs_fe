import { IDType } from "../_commons/id.type";

export type Notification_Type = "notify" | "alert";

export type Notification_Status = "ack" | "unack";

export interface NotificationModel {
  id: IDType;
  status: Notification_Status;
  title: string;
  message: string;
  userId: IDType;
  type: Notification_Type;
  createdAt: string;
  updatedAt: string;
}
