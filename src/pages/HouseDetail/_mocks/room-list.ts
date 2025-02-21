import { RoomModel } from "../../../types/room/room.type";

const databaseFields = {
  created_at: "",
  updated_at: "",
};

export const HD_roomList_floor1: RoomModel[] = [
  {
    ...databaseFields,
    id: "1-1-1",
    roomName: "Bedroom 1",
    houseId: "1",
    floorId: "1-1",
    devicesCount: 10,
    powerConsumedInDay: 10,
    powerConsumedInWeek: 22,
    powerConsumedInMonth: 40,
  },
  {
    ...databaseFields,
    id: "1-1-2",
    roomName: "Bedroom 2",
    houseId: "1",
    floorId: "1-1",
    devicesCount: 10,
    powerConsumedInDay: 6,
    powerConsumedInWeek: 10,
    powerConsumedInMonth: 20,
  },
  {
    ...databaseFields,
    id: "1-1-3",
    roomName: "Bedroom 3",
    houseId: "1",
    floorId: "1-1",
    devicesCount: 9,
    powerConsumedInDay: 0.2,
    powerConsumedInWeek: 2,
    powerConsumedInMonth: 5,
  },
  {
    ...databaseFields,
    id: "1-1-4",
    roomName: "WC",
    houseId: "1",
    floorId: "1",
    devicesCount: 4,
    powerConsumedInDay: 0.2,
    powerConsumedInWeek: 2,
    powerConsumedInMonth: 5,
  },
];

export const HD_roomList_floor2: RoomModel[] = [
  {
    ...databaseFields,
    id: "1-2-1",
    roomName: "Book room",
    houseId: "1",
    floorId: "1-2",
    devicesCount: 10,
    powerConsumedInDay: 10,
    powerConsumedInWeek: 22,
    powerConsumedInMonth: 40,
  },
  {
    ...databaseFields,
    id: "1-2-2",
    roomName: "Chill room ",
    houseId: "1",
    floorId: "1-2",
    devicesCount: 10,
    powerConsumedInDay: 6,
    powerConsumedInWeek: 10,
    powerConsumedInMonth: 20,
  },
  {
    ...databaseFields,
    id: "1-2-3",
    roomName: "WC",
    houseId: "1",
    floorId: "1-2",
    devicesCount: 4,
    powerConsumedInDay: 0.2,
    powerConsumedInWeek: 2,
    powerConsumedInMonth: 5,
  },
];

export const HD_roomList_floor3: RoomModel[] = [
  {
    ...databaseFields,
    id: "1-3-1",
    roomName: "Hall",
    houseId: "1",
    floorId: "1-3",
    devicesCount: 10,
    powerConsumedInDay: 10,
    powerConsumedInWeek: 22,
    powerConsumedInMonth: 40,
  },
];
