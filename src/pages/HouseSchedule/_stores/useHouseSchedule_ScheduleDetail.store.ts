import { ScheduleModel } from "src/types/schedule/schedule.type";
import { create } from "zustand";

export interface IHouseScheduleStore_ScheduleDetail {
  viewingScheduleDetail: boolean;
  setViewingScheduleDetail: (value: boolean) => void;

  currentSchedule: ScheduleModel | undefined;
  setCurrentSchedule: (value: ScheduleModel | undefined) => void;

  isActive: boolean;
  setIsActive: (value: boolean) => void;
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
    setCurrentSchedule: (value: ScheduleModel | undefined) => {
      set((state) => {
        state.currentSchedule = value;
        return { ...state };
      });
    },

    isActive: false,
    setIsActive: (value: boolean) => {
      set((state) => {
        state.isActive = value;
        return { ...state };
      });
    },
  }));

export default useHouseScheduleStore_ScheduleDetail;
