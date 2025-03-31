import { DeviceAttribute } from "../device/device.attribute.type";
import { Rule_CompareType } from "./rule.compareType.type";

export interface Rule_Condition {
  deviceAttribute: DeviceAttribute;
  value: number;
  compareType: Rule_CompareType;
}
