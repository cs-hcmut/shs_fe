import { DatabaseCommonFields } from "../_commons/common.type";

export type DeviceType = "light" | "fan" | "door" | "air_conditioner";

export interface DeviceModel extends DatabaseCommonFields {
  name: string;
  type: DeviceType;
  isActive: boolean;
  powerConsumedInDay: number;
  powerConsumedInWeek: number;
  powerConsumedInMonth: number;
}
