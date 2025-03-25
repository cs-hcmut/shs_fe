import { IDType } from "../_commons/id.type";

export interface Estate_CreateBody {
  name: string;
  userId: IDType;
  description: string;
  address: string;
}
