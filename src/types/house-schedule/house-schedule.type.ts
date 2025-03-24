import { IDType } from "../_commons/id.type";

export interface HouseScheduleModel {
  id: IDType;
  time: string;
  deviceAttrId: string;
  value: number;
  repeat: string;
  isActive: boolean;
  lastActiveDate: string;
  deviceAttribute: {
    id: IDType;
    feed: string;
    key: string;
    deviceId: string;
    value: number;
    device: {
      id: IDType;
      name: string;
      roomId: null;
      userId: string;
      createdAt: string;
    };
  };
}
