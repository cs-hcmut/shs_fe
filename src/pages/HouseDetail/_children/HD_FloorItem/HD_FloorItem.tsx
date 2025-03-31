import { Divider } from "@mui/material";
import { FloorModel } from "../../../../types/floor/floor.type";
import HD_RoomItem from "../HD_RoomItem";

interface HD_FloorItemProps {
  floor: FloorModel;
}

export default function HD_FloorItem({ floor }: HD_FloorItemProps) {
  const { name, rooms } = floor;

  return (
    <div className="py-4 px-3 bg-white rounded-lg border border-border-primary flex flex-col gap-4">
      <p className="text-xl font-semibold text-primaryBlue">{name}</p>

      <Divider className="!border-border-primary" />

      <div className="w-full gap-3 grid grid-cols-2">
        {rooms.map((room) => {
          return <HD_RoomItem key={room.id} room={room} />;
        })}
      </div>

      {/* <Divider className="!border-border-primary" />

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
      </div> */}
    </div>
  );
}
