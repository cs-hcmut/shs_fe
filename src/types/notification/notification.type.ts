import { DatabaseCommonFields } from "../_commons/common.type";

export interface NotificationModel extends DatabaseCommonFields {
  title: string;
  content: string;
}
