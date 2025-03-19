import { create } from "zustand";

export interface IHouseScheduleStore_AddSchedule {
  addingSchedule: boolean;
  setAddingSchedule: (value: boolean) => void;
}

const useHouseScheduleStore_AddSchedule =
  create<IHouseScheduleStore_AddSchedule>()((set) => ({
    addingSchedule: false,
    setAddingSchedule: (value: boolean) => {
      set((state) => {
        state.addingSchedule = value;
        return { ...state };
      });
    },
  }));

export default useHouseScheduleStore_AddSchedule;
