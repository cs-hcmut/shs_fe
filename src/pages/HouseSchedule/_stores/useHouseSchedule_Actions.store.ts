import { IDType } from "src/types/_commons/id.type";
import { create } from "zustand";

export interface HouseSchedule_DeviceActionForm {
  deviceAttrId: IDType;
  value: number;
}

export interface IHouseScheduleStore_Actions {
  actionList: HouseSchedule_DeviceActionForm[];
  setActionList: (value: HouseSchedule_DeviceActionForm[]) => void;
  addDeviceAction: () => void;
  removeDeviceAction: (actionIndex: number) => void;
}

export const HouseScheduleStore_Actions_defaultAction: HouseSchedule_DeviceActionForm =
  {
    deviceAttrId: "-1",
    value: 0,
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
