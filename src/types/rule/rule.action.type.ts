import { IDType } from "../_commons/id.type";
import { DeviceAttributeModel } from "../device/deviceAttribute/deviceAttribute.type";

export interface Rule_Action {
  id: IDType;
  ruleId: IDType;
  deviceAttrId: IDType;
  value: number;
  createdAt: string;
  updatedAt: string;
  deviceAttribute: DeviceAttributeModel;
}
