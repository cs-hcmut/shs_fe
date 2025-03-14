import { IDType } from "../_commons/id.type";

export type MeasuringDeviceType =
  | "temperature_sensor"
  | "humidity_sensor"
  | "lux_meter"
  | "sound_level_meter";

export interface HouseConfig_Condition {
  deviceType: MeasuringDeviceType;
  deviceName: string;
  deviceId: IDType;
  value: HouseConfig_Condition_ValueType;
  condition: HouseConfig_Condition_ConditionType;
  threshold: number | string;
}

export type HouseConfig_Condition_ValueType =
  | "temperature"
  | "humidity"
  | "air_quality"
  | "power";

export type HouseConfig_Condition_ConditionType =
  | ">"
  | "<"
  | "="
  | ">="
  | "<="
  | "!=";
