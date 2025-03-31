import { IDType } from "../_commons/id.type";
import { RoomModel } from "../room/room.type";

export interface FloorModel {
  id: IDType;
  name: string;
  realEstateId: IDType;
  createdAt: string;
  updatedAt: string;
  deviceCount: number;
  rooms: RoomModel[];
}
