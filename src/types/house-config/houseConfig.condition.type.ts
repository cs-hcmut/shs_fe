import { IDType } from "../_commons/id.type";

export type MeasuringDeviceType = "thermometer";

export interface HouseConfig_Condition {
  device: {
    id: IDType;
    type: MeasuringDeviceType;
    name: string;
  };
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
