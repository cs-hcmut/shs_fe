import { DatabaseCommonFields } from "../_commons/common.type";
import { IDType } from "../_commons/id.type";

export interface RoomModel extends DatabaseCommonFields {
  roomName: string;
  houseId: IDType;
  floorId: IDType;
  devicesCount: number;
  powerConsumedInDay: number;
  powerConsumedInWeek: number;
  powerConsumedInMonth: number;
}
