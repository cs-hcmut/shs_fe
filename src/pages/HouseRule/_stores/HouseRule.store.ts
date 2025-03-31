import { create } from "zustand";

export interface IHouseRuleStores {
  addingRule: boolean;
  setAddingRule: (value: boolean) => void;
}

const useHouseRuleStores = create<IHouseRuleStores>()((set) => ({
  addingRule: false,
  setAddingRule: (value: boolean) => {
    set((state) => {
      state.addingRule = value;
      return { ...state };
    });
  },
}));

export default useHouseRuleStores;
