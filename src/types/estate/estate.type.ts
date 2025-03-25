import { IDType } from "../_commons/id.type";

export interface EstateModel {
  id: IDType;
  name: string;
  userId: IDType;
  description: string;
  address: string;
  updatedAt: string;
  createdAt: string;
}
