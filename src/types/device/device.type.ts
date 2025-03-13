import { DatabaseCommonFields } from "../_commons/common.type";

export type DeviceType = "light" | "fan" | "door" | "air_conditioner";

export const DEVICE_ACTION_LIST = ["turn_off", "turn_on"] as const;
export type DeviceActionType = (typeof DEVICE_ACTION_LIST)[number];

export interface DeviceModel extends DatabaseCommonFields {
  name: string;
  type: DeviceType;
  isActive: boolean;
  powerConsumedInDay: number;
  powerConsumedInWeek: number;
  powerConsumedInMonth: number;
}
