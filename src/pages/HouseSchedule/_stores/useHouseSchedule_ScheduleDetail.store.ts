import { HouseScheduleModel } from "src/types/house-schedule/house-schedule.type";
import { create } from "zustand";

export interface IHouseScheduleStore_ScheduleDetail {
  viewingScheduleDetail: boolean;
  setViewingScheduleDetail: (value: boolean) => void;

  currentSchedule: HouseScheduleModel | undefined;
  setCurrentSchedule: (value: HouseScheduleModel | undefined) => void;
}

const useHouseScheduleStore_ScheduleDetail =
  create<IHouseScheduleStore_ScheduleDetail>()((set) => ({
    viewingScheduleDetail: false,
    setViewingScheduleDetail: (value: boolean) => {
      set((state) => {
        state.viewingScheduleDetail = value;
        return { ...state };
      });
    },

    currentSchedule: undefined,
    setCurrentSchedule: (value: HouseScheduleModel | undefined) => {
      set((state) => {
        state.currentSchedule = value;
        return { ...state };
      });
    },
  }));

export default useHouseScheduleStore_ScheduleDetail;
