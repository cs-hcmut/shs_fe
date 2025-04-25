import { RuleModel } from "src/types/rule/rule.type";
import { create } from "zustand";

export interface IHouseRuleStores_RuleDetail {
  viewingRuleDetail: boolean;
  setViewingRuleDetail: (value: boolean) => void;

  currentRule: RuleModel | undefined;
  setCurrentRule: (value: RuleModel | undefined) => void;

  activateRule: boolean;
  setActivateRule: (value: boolean) => void;

  receiveNoti: boolean;
  setReceiveNoti: (value: boolean) => void;
}

const useHouseRuleStores_RuleDetail = create<IHouseRuleStores_RuleDetail>()(
  (set) => ({
    viewingRuleDetail: false,
    setViewingRuleDetail: (value: boolean) => {
      set((state) => {
        state.viewingRuleDetail = value;
        return { ...state };
      });
    },

    currentRule: undefined,
    setCurrentRule: (value: RuleModel | undefined) => {
      set((state) => {
        state.currentRule = value;
        return { ...state };
      });
    },

    activateRule: false,
    setActivateRule: (value: boolean) => {
      set((state) => {
        state.activateRule = value;
        return { ...state };
      });
    },

    receiveNoti: false,
    setReceiveNoti: (value: boolean) => {
      set((state) => {
        state.receiveNoti = value;
        return { ...state };
      });
    },
  })
);

export default useHouseRuleStores_RuleDetail;
