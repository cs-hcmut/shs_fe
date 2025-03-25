import { IDType } from "../_commons/id.type";
import { DeviceAttribute } from "../device/device.attribute.type";

export interface Rule_Action {
  id: IDType;
  ruleId: IDType;
  deviceAttrId: IDType;
  value: number;
  createdAt: string;
  updatedAt: string;
  deviceAttribute: DeviceAttribute;
}
