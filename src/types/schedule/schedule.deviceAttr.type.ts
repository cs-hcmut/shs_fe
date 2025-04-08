import { IDType } from "../_commons/id.type";

export interface Schedule_DeviceAttribute {
  id: IDType;
  feed: string;
  key: string;
  deviceId: string;
  value: number;
  device: {
    id: IDType;
    name: string;
    room: { id: IDType; name: string } | null;
    userId: string;
    createdAt: string;
  };
}
