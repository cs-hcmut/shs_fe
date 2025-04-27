import { IDType } from "../_commons/id.type";
import { DeviceAttribute_KeyType } from "../device/deviceAttribute/deviceAttribute.type";

export interface StatsModel {
  id: IDType;
  key: DeviceAttribute_KeyType;
  feed: string;
  value: number;
  device: {
    id: IDType;
    name: string;
  };
  logs: Stats_Log[];
}

export interface Stats_Log {
  createdAt: string;
  value: number;
}

export interface PowerUsage {
  device: {
    id: IDType;
    name: string;
    power: number;
  };
  power: number;
}
