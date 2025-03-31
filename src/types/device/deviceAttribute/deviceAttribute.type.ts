import { IDType } from "src/types/_commons/id.type";

export type DeviceAttribute_KeyType = "temp" | "humidity" | "move" | "status";

export interface DeviceAttributeModel {
  id: IDType;
  feed: string;
  deviceId: IDType;
  key: DeviceAttribute_KeyType;
  value: number;
  isPublisher: boolean;
  createdAt: string;
  updatedAt: string;
  device: {
    id: IDType;
    name: string;
    roomId: IDType;
    userId: IDType;
    createdAt: string;
  };
}
