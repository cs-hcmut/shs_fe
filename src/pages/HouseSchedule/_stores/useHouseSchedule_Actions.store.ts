import { IDType } from "src/types/_commons/id.type";
import { DeviceActionType, DeviceType } from "src/types/device/device.type";
import { create } from "zustand";

export interface HouseSchedule_DeviceActionForm {
  roomId: IDType;
  deviceId: IDType;
  deviceType: DeviceType;
  action: DeviceActionType;
}

export interface IHouseScheduleStore_Actions {
  actionList: HouseSchedule_DeviceActionForm[];
  setActionList: (value: HouseSchedule_DeviceActionForm[]) => void;
  addDeviceAction: () => void;
  removeDeviceAction: (actionIndex: number) => void;
}

export const HouseScheduleStore_Actions_defaultAction: HouseSchedule_DeviceActionForm =
  {
    deviceType: "air_conditioner",
    action: "turn_off",
    roomId: "-1",
    deviceId: "-1",
  };

const useHouseScheduleStore_Actions = create<IHouseScheduleStore_Actions>()(
  (set) => ({
    actionList: [HouseScheduleStore_Actions_defaultAction],
    setActionList: (value: HouseSchedule_DeviceActionForm[]) => {
      set((state) => {
        state.actionList = value;
        return { ...state };
      });
    },
    addDeviceAction: () => {
      set((state) => {
        const newActionList = [
          ...state.actionList,
          HouseScheduleStore_Actions_defaultAction,
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

export default useHouseScheduleStore_Actions;
