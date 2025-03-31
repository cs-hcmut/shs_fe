import { Divider, Switch } from "@mui/material";
import MuiStyles from "src/styles";
import { Device, DeviceType } from "src/types/device/device.type";

interface RD_RoomController_DevicesProps {
  deviceType: DeviceType;
  deviceList: Device[];
}

const titleMap: { [key in DeviceType]: string } = {
  light: "Lights",
  fan: "Fans",
  door: "Doors",
  air_conditioner: "Air conditioners",
};

export default function RD_RoomController_Devices({
  deviceType,
  deviceList,
}: RD_RoomController_DevicesProps) {
  return (
    <div className="border rounded-lg shrink border-border-primary p-2 overflow-hidden flex flex-col gap-2">
      <p className="text-lg font-semibold">{titleMap[deviceType]}</p>
      <Divider className="!border-border-secondary" />
      {deviceList.map((device) => {
        const { id, name } = device;
        return (
          <div
            key={id}
            className="flex justify-between w-full items-center px-4"
          >
            <p className="">{name}</p>
            <Switch sx={MuiStyles.switchStyles.green} />
          </div>
        );
      })}
    </div>
  );
}
