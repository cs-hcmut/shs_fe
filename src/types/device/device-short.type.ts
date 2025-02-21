import { IDType } from "../_commons/id.type";
import { DeviceType } from "./device.type";

export interface DeviceShortModel {
  id: IDType;
  name: string;
  type: DeviceType;

  isActive: boolean;
}
