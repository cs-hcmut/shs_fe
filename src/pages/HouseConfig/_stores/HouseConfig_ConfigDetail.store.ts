import { HouseConfigModel } from "src/types/house-config/houseConfig.type";
import { create } from "zustand";

export interface IHouseConfigStore_ConfigDetail {
  viewingConfigDetail: boolean;
  setViewingConfigDetail: (value: boolean) => void;

  currentConfig: HouseConfigModel | undefined;
  setCurrentConfig: (value: HouseConfigModel | undefined) => void;
}

const useHouseConfigStore_ConfigDetail =
  create<IHouseConfigStore_ConfigDetail>()((set) => ({
    viewingConfigDetail: false,
    setViewingConfigDetail: (value: boolean) => {
      set((state) => {
        state.viewingConfigDetail = value;
        return { ...state };
      });
    },

    currentConfig: undefined,
    setCurrentConfig: (value: HouseConfigModel | undefined) => {
      set((state) => {
        state.currentConfig = value;
        return { ...state };
      });
    },
  }));

export default useHouseConfigStore_ConfigDetail;
