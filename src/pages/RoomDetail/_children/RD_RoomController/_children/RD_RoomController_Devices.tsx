import { Divider, Switch } from "@mui/material";
import { get } from "lodash";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import DeviceServices from "src/services/device.service";
import MuiStyles from "src/styles";
import { IDType } from "src/types/_commons/id.type";
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
  other: "Others",
};

export default function RD_RoomController_Devices({
  deviceType,
  deviceList,
}: RD_RoomController_DevicesProps) {
  // ! handle change status value
  const updateStatusMutation = DeviceServices.update.useUpdateDeviceAttr();
  const onToggleValue =
    (deviceId: IDType, attrId: IDType | undefined) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!attrId) {
        toast.error(`This device does not have 'status' attribute`);
        return;
      }
      const value = e.target.checked ? 1 : 0;
      toast.promise(
        updateStatusMutation.mutateAsync({
          deviceId,
          attrId,
          body: {
            value,
          },
        }),
        {
          loading: "Updating device attribute",
          success: "Updated device attribute successfully",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error: (err: any) =>
            get(err, "message", "Cannot update device attribute"),
        }
      );
    };

  return (
    <div className="border rounded-lg shrink border-border-primary p-2 overflow-hidden flex flex-col gap-2">
      <p className="text-lg font-semibold">{titleMap[deviceType]}</p>
      <Divider className="!border-border-secondary" />
      {deviceList.length == 0 ? (
        <div className="py-2 flex w-full items-center justify-center">
          <p className="">No devices</p>
        </div>
      ) : (
        deviceList.map((device) => {
          const { id, name, attributes } = device;
          const statusAttr = attributes.find((attr) => attr.key === "status");
          return (
            <div
              key={id}
              className="flex justify-between w-full items-center px-4"
            >
              <p className="">{name}</p>
              <Switch
                checked={statusAttr?.value == 1}
                sx={MuiStyles.switchStyles.green}
                onChange={onToggleValue(id, statusAttr?.id)}
              />
            </div>
          );
        })
      )}
    </div>
  );
}
