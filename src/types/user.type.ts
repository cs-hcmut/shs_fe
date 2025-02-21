import { SetupInstanceModel, SQLModel } from "./common.type";
import { Membership } from "./membership.type";
import { Pagination, PagingQueryConfig } from "./paging.type";

export interface UserCreate {
  name: string;
  email: string;
  phone: string;
  department?: string;
  position?: string;
}

export interface UserAddressModel extends SQLModel {
  default_flag: boolean;

  city: string;

  district: string;

  other_details: string;
}

export interface UserModel extends UserCreate, SQLModel {
  membership: Membership;
  authority_group: string;
  point: string;
  address: UserAddressModel[];
}

export interface UserListResponse extends Pagination {
  data: UserModel[];
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserUpdate {
  id: string;
  data: Partial<UserCreate>;
}

export function isUserModel(row: SetupInstanceModel): row is UserModel {
  return "login_id" in row;
}

export interface UserQueryConfig extends PagingQueryConfig {
  keyword?: string;
}
