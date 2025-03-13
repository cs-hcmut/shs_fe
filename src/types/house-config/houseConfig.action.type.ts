import { IDType } from "../_commons/id.type";
import { DeviceActionType, DeviceType } from "../device/device.type";

export interface HouseConfig_Action {
  deviceType: DeviceType;
  action: DeviceActionType;
  device: {
    id: IDType;
    name: string;
  };
  room: {
    id: IDType;
    name: string;
  };
}
