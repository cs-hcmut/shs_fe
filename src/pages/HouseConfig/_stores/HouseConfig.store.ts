import { create } from "zustand";

export interface IHouseConfigStore {
  viewingConfigDetail: boolean;
  setViewingConfigDetail: (value: boolean) => void;

  addingConfig: boolean;
  setAddingConfig: (value: boolean) => void;
}

const useHouseConfigStore = create<IHouseConfigStore>()((set) => ({
  viewingConfigDetail: false,
  setViewingConfigDetail: (value: boolean) => {
    set((state) => {
      state.viewingConfigDetail = value;
      return { ...state };
    });
  },

  addingConfig: false,
  setAddingConfig: (value: boolean) => {
    set((state) => {
      state.addingConfig = value;
      return { ...state };
    });
  },
}));

export default useHouseConfigStore;
