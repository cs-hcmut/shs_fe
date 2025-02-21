import { IDType } from "../_commons/id.type";

export interface HomeModel {
  id: IDType;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  imgUrl: string;
}
