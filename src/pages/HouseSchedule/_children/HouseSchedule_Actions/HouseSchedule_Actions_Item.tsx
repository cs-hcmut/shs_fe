import { useForm } from "react-hook-form";

import CustomFormInput from "src/components/_inputs/CustomFormInput";
import { HouseSchedule_ActionForm } from "src/types/schedule/schedule.action.type";
import useHouseScheduleStore_Actions from "../../_stores/useHouseSchedule_Actions.store";

interface HouseSchedule_Actions_ItemProps {
  actionIndex: number;
  defaultData?: HouseSchedule_ActionForm;
}

export default function HouseSchedule_Actions_Item({
  actionIndex,
  defaultData,
}: HouseSchedule_Actions_ItemProps) {
  const { removeDeviceAction } = useHouseScheduleStore_Actions();

  const formMethods = useForm<HouseSchedule_ActionForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  // ! remove action
  const onRemoveAction = () => {
    removeDeviceAction(actionIndex);
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
          <CustomFormInput
            control={control}
            inputField={{
              name: "deviceAttrId",
              title: "Device Attribute",
              type: "options",
              valueOptions: [
                { name: "Device 1", value: "1" },
                { name: "Device 2", value: "2" },
                { name: "Device 3", value: "3" },
              ],
            }}
            wrapperClassName={inputWrapperClassname}
          />
        </div>

        <div className="col-span-1">
          <CustomFormInput
            control={control}
            inputField={{
              name: "value",
              title: "Value",
              type: "options",
              valueOptions: [
                { name: "Turn on", value: "1" },
                { name: "Turn off", value: "0" },
              ],
            }}
            wrapperClassName={inputWrapperClassname}
          />
        </div>
      </div>
    </div>
  );
}
