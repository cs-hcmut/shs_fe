import RuleServices from "src/services/rule.service";
import useHouseScheduleStores_Actions, {
  HouseScheduleStore_Actions_defaultAction,
} from "../../_stores/useHouseSchedule_Actions.store";
import useHouseScheduleStore_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import HouseSchedule_Actions_Item from "../HouseSchedule_Actions_Item/HouseSchedule_Actions_Item";
import CustomFormInput, {
  InputOptionItem,
} from "src/components/_inputs/CustomFormInput/CustomFormInput";
import { Device_ActionOptionList } from "src/types/device/device.type";
import { useForm } from "react-hook-form";
import { HouseSchedule_ActionForm } from "src/types/schedule/schedule.action.type";

interface HouseSchedule_ActionsProps {}

export default function HouseSchedule_Actions({}: HouseSchedule_ActionsProps) {
  const { currentSchedule } = useHouseScheduleStore_ScheduleDetail();

  const { deviceAttributeList, setAction, setDeviceAttributeList } =
    useHouseScheduleStores_Actions();

  // ! handle change action value
  const { control } = useForm<HouseSchedule_ActionForm>({
    defaultValues: {
      value: currentSchedule?.value || 0,
    },
  });
  const onChangeValue = (value: string) => {
    setAction(Number(value));
  };

  // ! add condition
  const onAddActionForm = () => {
    setDeviceAttributeList([
      ...deviceAttributeList,
      HouseScheduleStore_Actions_defaultAction,
    ]);
  };

  // ! get subscribers
  const { data: subscriberData } = RuleServices.queries.useGetSubscribers();
  const subscribers = subscriberData?.data || [];
  const subscriberOptionList: InputOptionItem[] = subscribers.map((ele) => {
    const inputName = ele.device.room
      ? `${ele.device.name} - ${ele.device.room?.name}`
      : ele.device.name;
    return {
      name: inputName,
      value: ele.id,
    };
  });
  subscriberOptionList.push({
    name: "No device",
    value: "-1",
  });

  return (
    <div className="w-full flex flex-col gap-4 h-full overflow-hidden">
      <p className="font-medium text-lg text-slate-800">Device & action</p>

      <div className="col-span-1">
        <CustomFormInput
          control={control}
          inputField={{
            name: "value",
            title: "Value",
            type: "options",
            valueOptions: Device_ActionOptionList,
          }}
          wrapperClassName={
            "bg-white p-2 border text-sm border-border-secondary rounded-lg overflow-hidden truncate"
          }
          onChange={onChangeValue}
        />
      </div>

      <div className="w-full flex flex-col gap-2 flex-grow overflow-auto">
        {deviceAttributeList.map((_, index) => {
          return (
            <HouseSchedule_Actions_Item
              key={index}
              actionIndex={index}
              defaultData={
                currentSchedule ? deviceAttributeList[index] : undefined
              }
              subscriberOptionList={subscriberOptionList}
            />
          );
        })}

        <button
          onClick={onAddActionForm}
          className="p-2 rounded-lg border border-primaryBlue hover:bg-slate-100"
        >
          Add device
        </button>
      </div>
    </div>
  );
}
