import { IDType } from "../_commons/id.type";

export interface DeviceAttribute_Form {
  key: string;
  feed: string;
}

export interface DeviceAttribute {
  id: IDType;
  feed: string;
  deviceId: string;
  key: string;
  value: number;
  isPublisher: boolean;
  createdAt: string;
  updatedAt: string;
}
