import { HouseSchedule_DevicesForm } from "src/types/schedule/schedule.action.type";
import { create } from "zustand";

export interface IHouseScheduleStores_Actions {
  deviceAttributeList: HouseSchedule_DevicesForm[];
  setDeviceAttributeList: (value: HouseSchedule_DevicesForm[]) => void;

  action: boolean;
  setAction: (value: boolean) => void;

  addDevice: () => void;
  removeDevice: (actionIndex: number) => void;
}

export const HouseScheduleStore_Actions_defaultAction: HouseSchedule_DevicesForm =
  {
    deviceAttrId: "-1",
    deviceName: "No device",
  };

const useHouseScheduleStores_Actions = create<IHouseScheduleStores_Actions>()(
  (set) => ({
    deviceAttributeList: [HouseScheduleStore_Actions_defaultAction],
    setDeviceAttributeList: (value: HouseSchedule_DevicesForm[]) => {
      set((state) => {
        state.deviceAttributeList = value;
        return { ...state };
      });
    },

    addDevice: () => {
      set((state) => {
        const newActionList = [
          ...state.deviceAttributeList,
          HouseScheduleStore_Actions_defaultAction,
        ];
        state.deviceAttributeList = newActionList;
        return { ...state };
      });
    },
    removeDevice: (actionIndex: number) => {
      set((state) => {
        const newActionList = state.deviceAttributeList.filter(
          (_, index) => index !== actionIndex
        );
        state.deviceAttributeList = newActionList;
        return { ...state };
      });
    },

    action: false,
    setAction: (value: boolean) => {
      set((state) => {
        state.action = value;
        return { ...state };
      });
    },
  })
);

export default useHouseScheduleStores_Actions;
