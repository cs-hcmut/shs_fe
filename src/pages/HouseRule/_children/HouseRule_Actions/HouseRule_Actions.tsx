import useHouseRuleStore_Actions, {
  HouseRuleStores_Actions_defaultAction,
} from "../../_stores/HouseRule_Actions.store";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";
import HouseRule_Actions_Item from "./HouseRule_Actions_Item";
import { InputOptionItem } from "src/components/_inputs/CustomFormInput/CustomFormInput";
import RuleServices from "src/services/rule.service";

interface HouseRule_ActionsProps {}

export default function HouseRule_Actions({}: HouseRule_ActionsProps) {
  const { currentRule } = useHouseRuleStores_RuleDetail();

  const { actionList, setActionList } = useHouseRuleStore_Actions();

  // // ! Handle editing case
  // const defaultActionList: Rule_ActionForm[] = useMemo(() => {
  //   return (
  //     currentConfig?.actions.map((ele) => {
  //       const { deviceAttrId, value } = ele;
  //       return {
  //         deviceAttrId,
  //         value,
  //       };
  //     }) || []
  //   );
  // }, [currentConfig]);

  // useEffect(() => {
  //   if (currentConfig) {
  //     setActionList(defaultActionList);
  //   }
  // }, [currentConfig, defaultActionList, setActionList]);

  // ! add condition
  const onAddActionForm = () => {
    setActionList([...actionList, HouseRuleStores_Actions_defaultAction]);
  };

  // ! get subscribers
  const { data: subscriberData } = RuleServices.queries.useGetSubscribers();
  const subscribers = subscriberData?.data || [];
  const subscriberOptionList: InputOptionItem[] = subscribers.map((ele) => {
    return {
      name: ele.device.name,
      value: ele.id,
    };
  });

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800">Device & action</p>

      <div className="w-full flex flex-col gap-2 flex-grow overflow-auto">
        {actionList.map((_, index) => {
          return (
            <HouseRule_Actions_Item
              key={index}
              actionIndex={index}
              defaultData={currentRule ? actionList[index] : undefined}
              subscriberOptionList={subscriberOptionList}
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
