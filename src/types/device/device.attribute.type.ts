import { IDType } from "../_commons/id.type";

export interface DeviceAttribute_Form {
  key: string;
  feed: string;
}

export type DeviceAttribute_KeyType = "temp" | "humidity" | "move" | "status";

export interface DeviceAttribute {
  id: IDType;
  feed: string;
  deviceId: IDType;
  key: DeviceAttribute_KeyType;
  value: number;
  isPublisher: boolean;
  createdAt: string;
  updatedAt: string;
  device?: {
    id: IDType;
    name: string;
    roomId: IDType;
    userId: IDType;
    createdAt: string;
  };
}

export interface Device_Attribute {
  id: IDType;
  feed: string;
  deviceId: IDType;
  key: DeviceAttribute_KeyType;
  value: number;
  isPublisher: boolean;
  createdAt: string;
  updatedAt: string;
}
