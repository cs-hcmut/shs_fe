import React from "react";
import useHouseConfigStore_Conditions, {
  houseConfigStore_Condition_defaultCondition,
} from "../../_stores/HouseConfig_Conditions.store";
import HouseConfig_Conditions_Item from "./HouseConfig_Conditions_Item";

interface HouseConfig_ConditionsProps {}

export default function HouseConfig_Conditions({}: HouseConfig_ConditionsProps) {
  const { conditionList, setConditionList } = useHouseConfigStore_Conditions();

  // ! add condition
  const onAddCondition = () => {
    setConditionList([
      ...conditionList,
      houseConfigStore_Condition_defaultCondition,
    ]);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="font-medium text-lg text-slate-800">Conditions</p>

      <div className="w-full flex flex-col gap-2">
        {conditionList.map((cond, index) => {
          return (
            <HouseConfig_Conditions_Item key={index} conditionIndex={index} />
          );
        })}

        <button
          onClick={onAddCondition}
          className="p-2 rounded-lg bg-unhoveringBg hover:bg-hoveringBg text-white"
        >
          Add condition
        </button>
      </div>
    </div>
  );
}
