import { HouseSchedule_Condition } from "src/types/schedule/schedule.condition.type";
import { create } from "zustand";

export type HouseSchedule_Condition_RepeatEnum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface IHouseScheduleStore_Condition {
  timeValue: string;
  setTimeValue: (value: string) => void;
  resetTimeValue: () => void;

  repeat: Map<HouseSchedule_Condition_RepeatEnum, boolean>;
  setRepeat: (value: Map<HouseSchedule_Condition_RepeatEnum, boolean>) => void;
  toggleRepeat: (key: HouseSchedule_Condition_RepeatEnum) => void;
  clearRepeat: () => void;
  convertRepeatToString: () => string; // Thêm method mới
}

export const HouseScheduleStore_Condition_defaultCondition: HouseSchedule_Condition =
  {
    time: "00:00:00",
    repeat: "1111111",
  };

const useHouseScheduleStores_Condition =
  create<IHouseScheduleStore_Condition>()((set, get) => ({
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
    setRepeat: (value: Map<HouseSchedule_Condition_RepeatEnum, boolean>) => {
      set((state) => {
        state.repeat = value;
        return { ...state };
      });
    },
    toggleRepeat: (key: HouseSchedule_Condition_RepeatEnum) => {
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
    convertRepeatToString: () => {
      const state = get();
      let result = "";

      for (let day = 0; day < 7; day++) {
        const isActive =
          state.repeat.get(day as HouseSchedule_Condition_RepeatEnum) === true;

        result += isActive ? "1" : "0";
      }

      return result;
    },
  }));

export default useHouseScheduleStores_Condition;
