import { HouseConfig_ConditionForm } from "src/types/house-config/houseConfig.condition.type";
import useHouseConfigStore_Conditions, {
  houseConfigStore_Condition_defaultCondition,
} from "../../_stores/HouseConfig_Conditions.store";
import useHouseConfigStore_ConfigDetail from "../../_stores/HouseConfig_ConfigDetail.store";
import HouseConfig_Conditions_Item from "./HouseConfig_Conditions_Item";
import { useEffect, useMemo } from "react";

interface HouseConfig_ConditionsProps {}

export default function HouseConfig_Conditions({}: HouseConfig_ConditionsProps) {
  const { currentConfig } = useHouseConfigStore_ConfigDetail();

  const { conditionList, setConditionList } = useHouseConfigStore_Conditions();

  // ! Handle editing case
  const dataConditionList: HouseConfig_ConditionForm[] = useMemo(() => {
    return (
      currentConfig?.conditions.map((cond) => {
        return cond;
      }) || []
    );
  }, [currentConfig?.conditions]);

  useEffect(() => {
    if (currentConfig) {
      setConditionList(dataConditionList);
    }
  }, [currentConfig, dataConditionList, setConditionList]);

  // ! add condition
  const onAddConditionForm = () => {
    setConditionList([
      ...conditionList,
      houseConfigStore_Condition_defaultCondition,
    ]);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800 text-center">
        Conditions
      </p>

      <div className="w-full flex flex-col gap-2 overflow-auto">
        {conditionList.map((_, index) => {
          return (
            <HouseConfig_Conditions_Item
              key={index}
              defaultData={currentConfig ? conditionList[index] : undefined}
              conditionIndex={index}
            />
          );
        })}

        <button
          onClick={onAddConditionForm}
          className="p-2 rounded-lg border border-primaryBlue hover:bg-slate-100"
        >
          Add condition
        </button>
      </div>
    </div>
  );
}
