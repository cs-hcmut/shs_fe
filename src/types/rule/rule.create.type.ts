import { IDType } from "../_commons/id.type";
import { Rule_CompareType } from "./rule.compareType.type";

export interface Rule_CreateBody extends Rule_ConditionForm {
  actions: Rule_ActionForm[];
}

export interface Rule_ConditionForm {
  deviceAttrId: IDType;
  compareType: Rule_CompareType;
  value: number;
  deviceName: string;
}

export interface Rule_ActionForm {
  deviceAttrId: string;
  value: number;
}
