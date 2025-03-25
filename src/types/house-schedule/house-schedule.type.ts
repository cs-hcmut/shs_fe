import { IDType } from "../_commons/id.type";
import { Schedule_DeviceAttribute } from "./schedule.deviceAttr.type";

export interface HouseScheduleModel {
  id: IDType;
  time: string;
  deviceAttrId: string;
  value: number;
  repeat: string;
  isActive: boolean;
  lastActiveDate: string;
  DeviceAttributes: Schedule_DeviceAttribute[];
}
