import { create } from "zustand";

export interface IHouseConfigStore {
  addingConfig: boolean;
  setAddingConfig: (value: boolean) => void;
}

const useHouseConfigStore = create<IHouseConfigStore>()((set) => ({
  addingConfig: false,
  setAddingConfig: (value: boolean) => {
    set((state) => {
      state.addingConfig = value;
      return { ...state };
    });
  },
}));

export default useHouseConfigStore;
