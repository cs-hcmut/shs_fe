import { useForm } from "react-hook-form";

import CustomFormInput from "src/components/_inputs/CustomFormInput";
import { HouseSchedule_DevicesForm } from "src/types/schedule/schedule.action.type";
import useHouseScheduleStores_Actions from "../../_stores/useHouseSchedule_Actions.store";
import { InputOptionItem } from "src/components/_inputs/CustomFormInput/CustomFormInput";

interface HouseSchedule_Actions_ItemProps {
  actionIndex: number;
  defaultData?: HouseSchedule_DevicesForm;
  subscriberOptionList: InputOptionItem[];
}

export default function HouseSchedule_Actions_Item({
  actionIndex,
  defaultData,
  subscriberOptionList,
}: HouseSchedule_Actions_ItemProps) {
  const {
    removeDevice: removeDeviceAction,
    setDeviceAttributeList: setActionList,
    deviceAttributeList: actionList,
  } = useHouseScheduleStores_Actions();

  const formMethods = useForm<HouseSchedule_DevicesForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  // ! remove action
  const onRemoveAction = () => {
    removeDeviceAction(actionIndex);
  };

  // ! handle edit
  const onChangeAttrId = (value: string) => {
    setActionList(
      actionList.map((ele, i) => {
        if (i === actionIndex) {
          return {
            ...ele,
            deviceAttrId: value,
          };
        }
        return ele;
      })
    );
  };

  const inputWrapperClassname =
    "bg-white p-2 border text-sm border-border-secondary rounded-lg overflow-hidden truncate";

  return (
    <div className="w-full flex flex-col gap-2 p-2 rounded-lg bg-slate-100 border border-border-primary">
      <div className="w-full flex justify-end">
        <button
          onClick={onRemoveAction}
          className="bg-utility-error-500 hover:bg-utility-error-600 text-xs text-white py-1 px-2 rounded-lg"
        >
          Remove
        </button>
      </div>

      <div className="w-full grid grid-cols-3 gap-2">
        <div className="col-span-2">
          {subscriberOptionList.length > 0 && (
            <CustomFormInput
              control={control}
              inputField={{
                name: "deviceAttrId",
                title: "Device Attribute",
                type: "options",
                valueOptions: subscriberOptionList,
              }}
              wrapperClassName={inputWrapperClassname}
              onChange={onChangeAttrId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
