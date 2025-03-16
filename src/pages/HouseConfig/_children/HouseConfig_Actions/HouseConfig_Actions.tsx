import useHouseConfigStore_Actions, {
  houseConfigStore_Actions_defaultAction,
} from "../../_stores/HouseConfig_Actions.store";
import HouseConfig_Actions_Item from "./HouseConfig_Actions_Item";

interface HouseConfig_ActionsProps {}

export default function HouseConfig_Actions({}: HouseConfig_ActionsProps) {
  const { actionList, setActionList } = useHouseConfigStore_Actions();

  // ! add condition
  const onAddAction = () => {
    setActionList([...actionList, houseConfigStore_Actions_defaultAction]);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800">Device & action</p>

      <div className="w-full flex flex-col gap-2 flex-grow overflow-auto">
        {actionList.map((_, index) => {
          return <HouseConfig_Actions_Item key={index} actionIndex={index} />;
        })}

        <button
          onClick={onAddAction}
          className="p-2 rounded-lg border border-primaryBlue hover:bg-slate-100"
        >
          Add device & action
        </button>
      </div>
    </div>
  );
}
