import { IDType } from "../_commons/id.type";
import { DeviceAttribute } from "../device/device.attribute.type";
import { Rule_Action } from "./rule.action.type";
import { Rule_CompareType } from "./rule.compareType.type";

export interface RuleModel {
  id: IDType;
  userId: IDType;
  deviceAttrId: IDType;
  value: number;
  compareType: Rule_CompareType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deviceAttribute: DeviceAttribute;
  actions: Rule_Action[];
}
