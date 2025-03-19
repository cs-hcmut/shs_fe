import { DatabaseCommonFields } from "./_commons/common.type";
import { PagingQueryConfig } from "./paging.type";

export interface UserCreate {
  name: string;
  email: string;
  phone: string;
  department?: string;
  position?: string;
}

export interface UserAddressModel extends DatabaseCommonFields {
  default_flag: boolean;

  city: string;

  district: string;

  other_details: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserUpdate {
  id: string;
  data: Partial<UserCreate>;
}

export interface UserQueryConfig extends PagingQueryConfig {
  keyword?: string;
}
