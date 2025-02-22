import { Divider, Switch } from "@mui/material";
import MuiStyles from "src/styles";
import { DeviceModel, DeviceType } from "src/types/device/device.type";

interface RD_RoomController_DevicesProps {
  deviceType: DeviceType;
  deviceList: DeviceModel[];
}

const titleMap: { [key in DeviceType]: string } = {
  light: "Lights",
  fan: "Fans",
  door: "Doors",
  air_conditioner: "Air conditioners",
};

export default function RD_RoomController_Devices({
  deviceType,
}: RD_RoomController_DevicesProps) {
  return (
    <div className="border rounded-lg shrink border-border-primary p-2 overflow-hidden flex flex-col gap-2">
      <p className="text-lg font-semibold">{titleMap[deviceType]}</p>
      <Divider className="!border-border-secondary" />
      <div className="flex justify-between w-full items-center px-4">
        <p className="">Light 1</p>
        <Switch sx={MuiStyles.switchStyles.green} />
      </div>
      <div className="flex justify-between w-full items-center px-4">
        <p className="">Light 2</p>
        <Switch sx={MuiStyles.switchStyles.green} />
      </div>
      <div className="flex justify-between w-full items-center px-4">
        <p className="">Light 3</p>
        <Switch sx={MuiStyles.switchStyles.green} />
      </div>
      <div className="flex justify-between w-full items-center px-4">
        <p className="">Light 4</p>
        <Switch sx={MuiStyles.switchStyles.green} />
      </div>
    </div>
  );
}
