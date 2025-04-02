import { IDType } from "../_commons/id.type";
import { Rule_CreateBody } from "./rule.create.type";

export interface Rule_UpdateBody extends Partial<Rule_CreateBody> {}

export interface Rule_PatchBody {
  isActive: boolean;
}

export interface Rule_PatchDto {
  id: IDType;
  body: Rule_PatchBody;
}

export interface Rule_UpdateDto {
  id: IDType;
  body: Rule_UpdateBody;
}
