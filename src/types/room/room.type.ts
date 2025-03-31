import { IDType } from "../_commons/id.type";

export interface RoomModel {
  id: IDType;
  name: string;
  floorId: IDType;
  createdAt: string;
  updatedAt: string;
  deviceCount: number;
}
