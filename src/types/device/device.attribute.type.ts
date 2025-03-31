import { IDType } from "../_commons/id.type";
import { DeviceAttribute_KeyType } from "./deviceAttribute/deviceAttribute.type";

export interface DeviceAttribute_Form {
  key: string;
  feed: string;
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
