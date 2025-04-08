import { IDType } from "../_commons/id.type";
import { Device_Attribute } from "./device.attribute.type";

export const Device_DeviceTypeList = [
  "light",
  "fan",
  "door",
  "air_conditioner",
] as const;

export type DeviceType = (typeof Device_DeviceTypeList)[number];

export const DEVICE_ACTION_LIST = [0, 1] as const;
export const DEVICE_ACTION_NAME_MAP: { [key in DeviceActionType]: string } = {
  0: "Turn off",
  1: "Turn on",
};
export type DeviceActionType = (typeof DEVICE_ACTION_LIST)[number];

export interface Device {
  id: IDType;
  name: string;
  roomId: IDType | null;
  userId: IDType;
  type: DeviceType;
  createdAt: string;
  attributes: Device_Attribute[];
}

export const Device_ActionOptionList = DEVICE_ACTION_LIST.map((action) => {
  return {
    name: DEVICE_ACTION_NAME_MAP[action],
    value: action,
  };
});
