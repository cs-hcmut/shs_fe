import { useForm } from "react-hook-form";
import useHouseRuleStore_Actions from "../../_stores/HouseRule_Actions.store";
import CustomFormInput from "src/components/_inputs/CustomFormInput";
import {
  DEVICE_ACTION_LIST,
  DEVICE_ACTION_NAME_MAP,
  Device_DeviceTypeList,
  DeviceType,
} from "src/types/device/device.type";
import { Rule_ActionForm } from "src/types/rule/rule.create.type";

interface HouseRule_Actions_ItemProps {
  actionIndex: number;
  defaultData?: Rule_ActionForm;
}

export default function HouseRule_Actions_Item({
  actionIndex,
  defaultData,
}: HouseRule_Actions_ItemProps) {
  const { removeDeviceAction } = useHouseRuleStore_Actions();

  const formMethods = useForm<Rule_ActionForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  // ! remove condition
  const onRemoveCondition = () => {
    removeDeviceAction(actionIndex);
  };

  const deviceTypeNameMap: { [key in DeviceType]: string } = {
    air_conditioner: "Air conditioner",
    door: "Door",
    fan: "Fan",
    light: "Light",
  };

  const inputWrapperClassname =
    "bg-white p-2 border text-sm border-border-secondary rounded-lg overflow-hidden truncate";

  return (
    <div className="w-full flex flex-col gap-2 p-2 rounded-lg bg-slate-100 border border-border-primary">
      <div className="w-full flex justify-end">
        <button
          onClick={onRemoveCondition}
          className="bg-utility-error-500 hover:bg-utility-error-600 text-xs text-white py-1 px-2 rounded-lg"
        >
          Remove
        </button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "deviceAttrId",
                title: "Device type",
                type: "options",
                valueOptions: Device_DeviceTypeList.map((type) => {
                  return { name: deviceTypeNameMap[type], value: type };
                }),
              }}
              wrapperClassName={inputWrapperClassname}
            />
          </div>

          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "value",
                title: "Action",
                type: "options",
                valueOptions: DEVICE_ACTION_LIST.map((action) => {
                  return {
                    name: DEVICE_ACTION_NAME_MAP[action],
                    value: action,
                  };
                }),
              }}
              wrapperClassName={inputWrapperClassname}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
