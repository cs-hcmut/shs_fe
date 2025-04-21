import { IDType } from "../_commons/id.type";

export interface DeviceUpdateAttributeBody {
  value: number;
}

export interface DeviceUpdateAttributeDto {
  deviceId: IDType;
  attrId: IDType;
  body: DeviceUpdateAttributeBody;
}
