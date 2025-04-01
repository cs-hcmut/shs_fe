import { DeviceAttributeModel } from "../device/deviceAttribute/deviceAttribute.type";
import { Rule_CompareType } from "./rule.compareType.type";

export interface Rule_Condition {
  deviceAttribute: DeviceAttributeModel;
  value: number;
  compareType: Rule_CompareType;
}
