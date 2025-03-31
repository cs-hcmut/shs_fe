import { IDType } from "../_commons/id.type";
import { FloorModel } from "../floor/floor.type";

export interface EstateModel {
  id: IDType;
  name: string;
  userId: IDType;
  description: string;
  address: string;
  updatedAt: string;
  createdAt: string;
}

export interface EstateDetail {
  id: IDType;
  name: string;
  userId: IDType;
  description: string;
  address: string;
  updatedAt: string;
  createdAt: string;
  floors: FloorModel[];
}
