import { HouseSchedule_Condition } from "src/types/house-schedule/house-schedule.condition.type";
import { create } from "zustand";

export type HouseSchedule_Condition_RepeatEnum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface IHouseScheduleStore_Conditions {
  timeValue: string;
  setTimeValue: (value: string) => void;
  resetTimeValue: () => void;

  repeat: Map<HouseSchedule_Condition_RepeatEnum, boolean>;
  setRepeat: (key: HouseSchedule_Condition_RepeatEnum) => void;
  clearRepeat: () => void;
}

export const HouseScheduleStore_Condition_defaultCondition: HouseSchedule_Condition =
  {
    time: "00:00:00",
  };

const useHouseScheduleStore_Conditions =
  create<IHouseScheduleStore_Conditions>()((set) => ({
    timeValue: "06:00:00",
    setTimeValue: (value: string) => {
      set((state) => {
        state.timeValue = value;
        return { ...state };
      });
    },
    resetTimeValue: () => {
      set((state) => {
        state.timeValue = "06:00:00";
        return { ...state };
      });
    },

    repeat: new Map(),
    setRepeat: (key: HouseSchedule_Condition_RepeatEnum) => {
      set((state) => {
        const { repeat } = state;
        state.repeat.set(key, repeat.get(key) === true ? false : true);
        return { ...state };
      });
    },
    clearRepeat: () => {
      set((state) => {
        state.repeat = new Map();
        return { ...state };
      });
    },
  }));

export default useHouseScheduleStore_Conditions;
