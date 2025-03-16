import { DatabaseCommonFields } from "../_commons/common.type";

export const Device_DeviceTypeList = [
  "light",
  "fan",
  "door",
  "air_conditioner",
] as const;

export type DeviceType = (typeof Device_DeviceTypeList)[number];

export const DEVICE_ACTION_LIST = ["turn_off", "turn_on"] as const;
export const DEVICE_ACTION_NAME_MAP: { [key in DeviceActionType]: string } = {
  turn_on: "Turn on",
  turn_off: "Turn off",
};
export type DeviceActionType = (typeof DEVICE_ACTION_LIST)[number];

export interface DeviceModel extends DatabaseCommonFields {
  name: string;
  type: DeviceType;
  isActive: boolean;
  powerConsumedInDay: number;
  powerConsumedInWeek: number;
  powerConsumedInMonth: number;
}
