import { useForm } from "react-hook-form";
import useHouseConfigStore_Actions, {
  HouseConfig_DeviceActionForm,
} from "../../_stores/HouseConfig_Actions.store";
import CustomFormInput from "src/components/_inputs/CustomFormInput";
import {
  DEVICE_ACTION_LIST,
  DEVICE_ACTION_NAME_MAP,
  Device_DeviceTypeList,
  DeviceType,
} from "src/types/device/device.type";

interface HouseConfig_Actions_ItemProps {
  actionIndex: number;
  defaultData?: HouseConfig_DeviceActionForm;
}

export default function HouseConfig_Actions_Item({
  actionIndex,
  defaultData,
}: HouseConfig_Actions_ItemProps) {
  const { removeDeviceAction } = useHouseConfigStore_Actions();

  const formMethods = useForm<HouseConfig_DeviceActionForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  // ! remove condition
  const onRemoveCondition = () => {
    removeDeviceAction(actionIndex);
  };

  const deviceTypeNameMap: { [key in DeviceType]: string } = {
    air_conditioner: "Air conditioner",
    door: "Door",
    fan: "Fan",
    light: "Light",
  };

  const inputWrapperClassname =
    "bg-white p-2 border text-sm border-border-secondary rounded-lg overflow-hidden truncate";

  return (
    <div className="w-full flex flex-col gap-2 p-2 rounded-lg bg-slate-100 border border-border-primary">
      <div className="w-full flex justify-end">
        <button
          onClick={onRemoveCondition}
          className="bg-utility-error-500 hover:bg-utility-error-600 text-xs text-white py-1 px-2 rounded-lg"
        >
          Remove
        </button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <CustomFormInput
          control={control}
          inputField={{
            name: "roomId",
            title: "Room",
            type: "options",
            valueOptions: [
              { name: "Room 1", value: "1" },
              { name: "Room 2", value: "2" },
              { name: "Room 3", value: "3" },
            ],
          }}
          wrapperClassName={inputWrapperClassname}
        />

        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "deviceType",
                title: "Device type",
                type: "options",
                valueOptions: Device_DeviceTypeList.map((type) => {
                  return { name: deviceTypeNameMap[type], value: type };
                }),
              }}
              wrapperClassName={inputWrapperClassname}
            />
          </div>
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "deviceId",
                title: "Device",
                type: "options",
                valueOptions: [
                  { name: "Device 1", value: "1" },
                  { name: "Device 2", value: "2" },
                  { name: "Device 3", value: "3" },
                ],
              }}
              wrapperClassName={inputWrapperClassname}
            />
          </div>
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "action",
                title: "Action",
                type: "options",
                valueOptions: DEVICE_ACTION_LIST.map((action) => {
                  return {
                    name: DEVICE_ACTION_NAME_MAP[action],
                    value: action,
                  };
                }),
              }}
              wrapperClassName={inputWrapperClassname}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
