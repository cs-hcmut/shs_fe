import useHouseScheduleStore_Actions, {
  HouseScheduleStore_Actions_defaultAction,
} from "../../_stores/useHouseSchedule_Actions.store";
import useHouseScheduleStore_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import HouseSchedule_Actions_Item from "./HouseSchedule_Actions_Item";

interface HouseSchedule_ActionsProps {}

export default function HouseSchedule_Actions({}: HouseSchedule_ActionsProps) {
  const { currentSchedule } = useHouseScheduleStore_ScheduleDetail();

  const { actionList, setActionList } = useHouseScheduleStore_Actions();

  // // ! Handle editing case
  // const defaultActionList: HouseSchedule_DeviceActionForm[] = useMemo(() => {
  //   return (
  //     currentSchedule?.a.map((ele) => {
  //       const { action, device, room, deviceType } = ele;
  //       return {
  //         roomId: room.id,
  //         deviceId: device.id,
  //         deviceType,
  //         action,
  //       };
  //     }) || []
  //   );
  // }, [currentSchedule]);

  // useEffect(() => {
  //   if (currentSchedule) {
  //     setActionList(defaultActionList);
  //   }
  // }, [currentSchedule, defaultActionList, setActionList]);

  // ! add condition
  const onAddActionForm = () => {
    setActionList([...actionList, HouseScheduleStore_Actions_defaultAction]);
  };

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800">Device & action</p>

      <div className="w-full flex flex-col gap-2 flex-grow overflow-auto">
        {actionList.map((_, index) => {
          return (
            <HouseSchedule_Actions_Item
              key={index}
              actionIndex={index}
              defaultData={currentSchedule ? actionList[index] : undefined}
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
