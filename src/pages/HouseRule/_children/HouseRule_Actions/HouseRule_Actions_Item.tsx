import { useForm } from "react-hook-form";
import useHouseRuleStore_Actions from "../../_stores/HouseRule_Actions.store";
import CustomFormInput from "src/components/_inputs/CustomFormInput";
import {
  DEVICE_ACTION_LIST,
  DEVICE_ACTION_NAME_MAP,
} from "src/types/device/device.type";
import { Rule_ActionForm } from "src/types/rule/rule.create.type";
import { InputOptionItem } from "src/components/_inputs/CustomFormInput/CustomFormInput";

interface HouseRule_Actions_ItemProps {
  actionIndex: number;
  defaultData?: Rule_ActionForm;
  subscriberOptionList: InputOptionItem[];
}

export default function HouseRule_Actions_Item({
  actionIndex,
  defaultData,
  subscriberOptionList,
}: HouseRule_Actions_ItemProps) {
  const { removeDeviceAction, setActionList, actionList } =
    useHouseRuleStore_Actions();

  const formMethods = useForm<Rule_ActionForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  // ! remove actions
  const onRemoveCondition = () => {
    removeDeviceAction(actionIndex);
  };

  // ! on change attribute
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

  const onChangeValue = (value: string) => {
    setActionList(
      actionList.map((ele, i) => {
        if (i === actionIndex) {
          return {
            ...ele,
            value: Number(value),
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
          onClick={onRemoveCondition}
          className="bg-utility-error-500 hover:bg-utility-error-600 text-xs text-white py-1 px-2 rounded-lg"
        >
          Remove
        </button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-1">
          <div className="col-span-1">
            {subscriberOptionList.length > 0 && (
              <CustomFormInput
                control={control}
                inputField={{
                  name: "deviceAttrId",
                  title: "Device",
                  type: "options",
                  valueOptions: subscriberOptionList,
                }}
                wrapperClassName={inputWrapperClassname}
                onChange={onChangeAttrId}
              />
            )}
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
              onChange={onChangeValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
