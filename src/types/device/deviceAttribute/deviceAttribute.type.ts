import { IDType } from "src/types/_commons/id.type";

export type DeviceAttribute_KeyType = "temp" | "humidity" | "move" | "status";

export const deviceAttributeKey_vietnameseMap: {
  [key in DeviceAttribute_KeyType]: string;
} = {
  humidity: "Độ ẩm",
  move: "Chuyển động",
  status: "Trạng thái",
  temp: "Nhiệt độ",
};

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
    room: DeviceAttribute_Room | null;
    userId: IDType;
    createdAt: string;
  };
}

export interface DeviceAttribute_Room {
  id: IDType;
  name: string;
  floorId: IDType;
}
