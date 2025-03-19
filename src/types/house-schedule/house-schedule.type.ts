import { IDType } from "../_commons/id.type";

export interface HouseScheduleModel {
  id: IDType;
  time: string;
  deviceAttrId: IDType;
  value: number;
  repeat: string;
}
