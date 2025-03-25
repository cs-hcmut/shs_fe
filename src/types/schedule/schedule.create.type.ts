import { IDType } from "../_commons/id.type";

export interface Schedule_CreateBody {
  time: string;
  deviceAttrId: IDType[];
  value: number;
  repeat: string;
}
