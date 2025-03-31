import { useEffect, useMemo } from "react";
import useHouseRuleStore_Actions, {
  HouseRuleStores_Actions_defaultAction,
} from "../../_stores/HouseRule_Actions.store";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";
import HouseRule_Actions_Item from "./HouseRule_Actions_Item";
import { Rule_ActionForm } from "src/types/rule/rule.create.type";

interface HouseRule_ActionsProps {}

export default function HouseRule_Actions({}: HouseRule_ActionsProps) {
  const { currentRule: currentConfig } = useHouseRuleStores_RuleDetail();

  const { actionList, setActionList } = useHouseRuleStore_Actions();

  // ! Handle editing case
  const defaultActionList: Rule_ActionForm[] = useMemo(() => {
    return (
      currentConfig?.actions.map((ele) => {
        const { deviceAttrId, value } = ele;
        return {
          deviceAttrId,
          value,
        };
      }) || []
    );
  }, [currentConfig]);

  useEffect(() => {
    if (currentConfig) {
      setActionList(defaultActionList);
    }
  }, [currentConfig, defaultActionList, setActionList]);

  // ! add condition
  const onAddActionForm = () => {
    setActionList([...actionList, HouseRuleStores_Actions_defaultAction]);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800">Device & action</p>

      <div className="w-full flex flex-col gap-2 flex-grow overflow-auto">
        {actionList.map((_, index) => {
          return (
            <HouseRule_Actions_Item
              key={index}
              actionIndex={index}
              defaultData={currentConfig ? actionList[index] : undefined}
            />
          );
        })}

        <button
          onClick={onAddActionForm}
          className="p-2 rounded-lg border border-primaryBlue hover:bg-slate-100"
        >
          Add device & action
        </button>
      </div>
    </div>
  );
}
