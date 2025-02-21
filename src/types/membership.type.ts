import { SQLModel } from "./common.type";

export interface Membership extends SQLModel {
  name: string;
  deduct_rate: number;
  deduct_limit: number;
  renew_date: string;
}
