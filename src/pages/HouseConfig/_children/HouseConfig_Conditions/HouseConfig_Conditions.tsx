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
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800 text-center">
        Conditions
      </p>

      <div className="w-full flex flex-col gap-2 overflow-auto">
        {conditionList.map((_, index) => {
          return (
            <HouseConfig_Conditions_Item key={index} conditionIndex={index} />
          );
        })}

        <button
          onClick={onAddCondition}
          className="p-2 rounded-lg border border-primaryBlue hover:bg-slate-100"
        >
          Add condition
        </button>
      </div>
    </div>
  );
}
