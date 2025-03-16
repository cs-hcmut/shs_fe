import { IDType } from "src/types/_commons/id.type";
import { DeviceActionType, DeviceType } from "src/types/device/device.type";
import { create } from "zustand";

export interface HouseConfig_DeviceActionForm {
  roomId: IDType;
  deviceId: IDType;
  deviceType: DeviceType;
  action: DeviceActionType;
}

export interface IHouseConfigStore_Actions {
  actionList: HouseConfig_DeviceActionForm[];
  setActionList: (value: HouseConfig_DeviceActionForm[]) => void;
  addDeviceAction: () => void;
  removeDeviceAction: (actionIndex: number) => void;
}

export const houseConfigStore_Actions_defaultAction: HouseConfig_DeviceActionForm =
  {
    deviceType: "air_conditioner",
    action: "turn_off",
    roomId: "-1",
    deviceId: "-1",
  };

const useHouseConfigStore_Actions = create<IHouseConfigStore_Actions>()(
  (set) => ({
    actionList: [houseConfigStore_Actions_defaultAction],
    setActionList: (value: HouseConfig_DeviceActionForm[]) => {
      set((state) => {
        state.actionList = value;
        return { ...state };
      });
    },
    addDeviceAction: () => {
      set((state) => {
        const newActionList = [
          ...state.actionList,
          houseConfigStore_Actions_defaultAction,
        ];
        state.actionList = newActionList;
        return { ...state };
      });
    },
    removeDeviceAction: (actionIndex: number) => {
      set((state) => {
        const newActionList = state.actionList.filter(
          (_, index) => index !== actionIndex
        );
        state.actionList = newActionList;
        return { ...state };
      });
    },
  })
);

export default useHouseConfigStore_Actions;
