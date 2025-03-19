import { HouseSchedule_Condition } from "src/types/house-schedule/house-schedule.condition.type";
import { create } from "zustand";

export interface IHouseScheduleStore_Conditions {
  conditionList: HouseSchedule_Condition[];
  setConditionList: (value: HouseSchedule_Condition[]) => void;
}

export const HouseScheduleStore_Condition_defaultCondition: HouseSchedule_Condition =
  {
    type: "time",
    time: "00:00:00",
    interval: 0,
  };

const useHouseScheduleStore_Conditions =
  create<IHouseScheduleStore_Conditions>()((set) => ({
    conditionList: [HouseScheduleStore_Condition_defaultCondition],
    setConditionList: (value: HouseSchedule_Condition[]) => {
      set((state) => {
        state.conditionList = value;
        return { ...state };
      });
    },
  }));

export default useHouseScheduleStore_Conditions;
