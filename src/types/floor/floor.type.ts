import { DatabaseCommonFields } from "../_commons/common.type";
import { IDType } from "../_commons/id.type";

export interface FloorModel extends DatabaseCommonFields {
  floorLevel: number;
  houseId: IDType;
  roomsCount: number;
  devicesCount: number;
  powerUsedInDay: number;
  powerUsedInWeek: number;
  powerUsedInMonth: number;
}
