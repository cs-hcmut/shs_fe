import { IDType } from "../_commons/id.type";
import { Rule_CreateBody } from "./rule.create.type";

export interface Rule_UpdateBody extends Partial<Rule_CreateBody> {}

export interface Rule_UpdateDto {
  id: IDType;
  body: Rule_UpdateBody;
}
