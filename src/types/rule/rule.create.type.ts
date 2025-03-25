import { IDType } from "../_commons/id.type";
import { Rule_CompareType } from "./rule.compareType.type";

export interface Rule_CreateBody {
  deviceAttrId: IDType;
  compareType: Rule_CompareType;
  value: number;
  actions: Rule_CreateBody_Action[];
}

export interface Rule_CreateBody_Action {
  deviceAttrId: string;
  value: number;
}
