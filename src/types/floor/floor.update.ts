import { IDType } from "../_commons/id.type";

export interface Floor_UpdateBody {
  name?: string;
  realEstateId?: IDType;
}

export interface Floor_UpdateDto {
  body: Floor_UpdateBody;
  id: IDType;
}
