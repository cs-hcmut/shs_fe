import { Rule_ConditionForm } from "src/types/rule/rule.create.type";
import { create } from "zustand";

export interface IHouseRuleStores_Condition {
  condition: Rule_ConditionForm;
  setCondition: (value: Rule_ConditionForm) => void;
}

export const houseRuleStores_Condition_defaultCondition: Rule_ConditionForm = {
  deviceAttrId: "-1",
  compareType: "eq",
  value: 0,
};

const useHouseConfigStore_Condition = create<IHouseRuleStores_Condition>()(
  (set) => ({
    condition: houseRuleStores_Condition_defaultCondition,
    setCondition: (value: Rule_ConditionForm) => {
      set((state) => {
        state.condition = value;
        return { ...state };
      });
    },
  })
);

export default useHouseConfigStore_Condition;
