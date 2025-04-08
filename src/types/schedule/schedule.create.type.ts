import { IDType } from "../_commons/id.type";

export interface Schedule_CreateBody {
  time: string;
  deviceAttrIds: IDType[];
  value: number;
  repeat: string;
}
