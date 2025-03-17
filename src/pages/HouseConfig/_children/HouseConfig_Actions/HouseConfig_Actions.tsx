import { useEffect, useMemo } from "react";
import useHouseConfigStore_Actions, {
  HouseConfig_DeviceActionForm,
  houseConfigStore_Actions_defaultAction,
} from "../../_stores/HouseConfig_Actions.store";
import useHouseConfigStore_ConfigDetail from "../../_stores/HouseConfig_ConfigDetail.store";
import HouseConfig_Actions_Item from "./HouseConfig_Actions_Item";

interface HouseConfig_ActionsProps {}

export default function HouseConfig_Actions({}: HouseConfig_ActionsProps) {
  const { currentConfig } = useHouseConfigStore_ConfigDetail();

  const { actionList, setActionList } = useHouseConfigStore_Actions();

  // ! Handle editing case
  const defaultActionList: HouseConfig_DeviceActionForm[] = useMemo(() => {
    return (
      currentConfig?.actions.map((ele) => {
        const { action, device, room, deviceType } = ele;
        return {
          roomId: room.id,
          deviceId: device.id,
          deviceType,
          action,
        };
      }) || []
    );
  }, [currentConfig]);

  useEffect(() => {
    if (currentConfig) {
      setActionList(defaultActionList);
    }
  }, [currentConfig, defaultActionList, setActionList]);

  // ! add condition
  const onAddActionForm = () => {
    setActionList([...actionList, houseConfigStore_Actions_defaultAction]);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800">Device & action</p>

      <div className="w-full flex flex-col gap-2 flex-grow overflow-auto">
        {actionList.map((_, index) => {
          return (
            <HouseConfig_Actions_Item
              key={index}
              actionIndex={index}
              defaultData={currentConfig ? actionList[index] : undefined}
            />
          );
        })}

        <button
          onClick={onAddActionForm}
          className="p-2 rounded-lg border border-primaryBlue hover:bg-slate-100"
        >
          Add device & action
        </button>
      </div>
    </div>
  );
}
