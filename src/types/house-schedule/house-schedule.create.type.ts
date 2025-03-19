import { IDType } from "../_commons/id.type";

export interface HouseSchedule_Create {
  time: string;
  deviceAttrId: IDType;
  value: number;
  repeat: string;
}
