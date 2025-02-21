import { Divider } from "@mui/material";
import { FloorModel } from "../../../../types/floor/floor.type";
import { IDType } from "../../../../types/_commons/id.type";
import { RoomModel } from "../../../../types/room/room.type";
import {
  HD_roomList_floor1,
  HD_roomList_floor2,
  HD_roomList_floor3,
} from "../../_mocks/room-list";
import HD_RoomItem from "../HD_RoomItem";

interface HD_FloorItemProps {
  floor: FloorModel;
}

const roomListMap: { [key: IDType]: RoomModel[] } = {
  "1-1": HD_roomList_floor1,
  "1-2": HD_roomList_floor2,
  "1-3": HD_roomList_floor3,
};

export default function HD_FloorItem({ floor }: HD_FloorItemProps) {
  const {
    floorLevel,
    id: floorId,
    powerUsedInDay,
    powerUsedInWeek,
    powerUsedInMonth,
    devicesCount,
  } = floor;

  const roomList = roomListMap[floorId] || [];

  return (
    <div className="py-4 px-3 rounded-lg border border-border-primary flex flex-col gap-4">
      <p className="text-xl font-semibold text-primaryBlue">
        Floor {floorLevel}
      </p>

      <Divider className="!border-border-primary" />

      <div className="w-full gap-3 grid grid-cols-2">
        {roomList.map((room) => {
          return <HD_RoomItem key={room.id} room={room} />;
        })}
      </div>

      <Divider className="!border-border-primary" />

      <div className="flex w-full flex-col gap-3">
        <p className="text-lg font-semibold ">Statistics</p>
        <div className="w-full grid grid-cols-2 gap-2 text-sm lg:text-base">
          <p className="text-left text-darkColor500  font-medium">Devices</p>
          <p className="text-left font-semibold ">{devicesCount}</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-sm lg:text-base">
          <p className="text-left text-darkColor500  font-medium">
            Power used in day
          </p>
          <p className="text-left font-semibold ">{powerUsedInDay} kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-sm lg:text-base">
          <p className="text-left text-darkColor500  font-medium">
            Power used in week
          </p>
          <p className="text-left font-semibold ">{powerUsedInWeek} kW</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-sm lg:text-base">
          <p className="text-left text-darkColor500  font-medium">
            Power used in month
          </p>
          <p className="text-left font-semibold ">{powerUsedInMonth} kW</p>
        </div>
      </div>
    </div>
  );
}
