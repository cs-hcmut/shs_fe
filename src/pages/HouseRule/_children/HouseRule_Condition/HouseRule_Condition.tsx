import useHouseConfigStore_Condition from "../../_stores/HouseRule_Conditions.store";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";
import HouseRule_Condition_Item from "./HouseConfig_Conditions_Item";
import { useEffect, useMemo } from "react";
import { Rule_ConditionForm } from "src/types/rule/rule.create.type";

interface HouseRule_ConditionsProps {}

export default function HouseRule_Condition({}: HouseRule_ConditionsProps) {
  const { currentRule } = useHouseRuleStores_RuleDetail();

  const { setCondition } = useHouseConfigStore_Condition();

  // ! Handle editing case
  const dataCondition: Rule_ConditionForm = useMemo(() => {
    return { ...currentRule } as Rule_ConditionForm;
  }, [currentRule]);

  useEffect(() => {
    if (currentRule) {
      setCondition(dataCondition);
    }
  }, [currentRule, setCondition, dataCondition]);

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800 text-center">
        Condition
      </p>

      <div className="w-full flex flex-col gap-2 overflow-auto">
        <HouseRule_Condition_Item
          defaultData={currentRule ? dataCondition : undefined}
        />
      </div>
    </div>
  );
}
