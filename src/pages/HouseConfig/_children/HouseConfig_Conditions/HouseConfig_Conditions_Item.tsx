import { useForm } from "react-hook-form";
import { HouseConfig_ConditionForm } from "src/types/house-config/houseConfig.condition.type";
import CustomFormInput from "src/components/_inputs/CustomFormInput";
import useHouseConfigStore_Conditions from "../../_stores/HouseConfig_Conditions.store";

interface HouseConfig_Conditions_ItemProps {
  conditionIndex: number;
  defaultData?: HouseConfig_ConditionForm;
}

export default function HouseConfig_Conditions_Item({
  conditionIndex,
  defaultData,
}: HouseConfig_Conditions_ItemProps) {
  const { conditionList, setConditionList } = useHouseConfigStore_Conditions();

  const formMethods = useForm<HouseConfig_ConditionForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  // ! remove condition
  const onRemoveCondition = () => {
    setConditionList(
      conditionList.filter((_, index) => index !== conditionIndex)
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
        <CustomFormInput
          control={control}
          inputField={{
            name: "sensorType",
            title: "Type",
            type: "options",
            valueOptions: [
              { name: "Temperature sensor", value: "temperature_sensor" },
              { name: "Humidity sensor", value: "humidity_sensor" },
              { name: "Lux meter", value: "lux_meter" },
              { name: "Sound level meter", value: "sound_level_meter" },
            ],
          }}
          wrapperClassName={inputWrapperClassname}
        />
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-2">
            <CustomFormInput
              control={control}
              inputField={{
                name: "sensorId",
                title: "Sensor",
                type: "options",
                valueOptions: [
                  { name: "Sensor 1", value: "1" },
                  { name: "Sensor 2", value: "2" },
                  { name: "Sensor 3", value: "3" },
                ],
              }}
              wrapperClassName={inputWrapperClassname}
            />
          </div>
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "condition",
                title: "Condition",
                type: "options",
                valueOptions: [
                  { name: "=", value: "=" },
                  { name: "!=", value: "!=" },
                  { name: ">", value: ">" },
                  { name: ">=", value: ">=" },
                  { name: "<", value: "<" },
                  { name: "<=", value: "<=" },
                ],
              }}
              wrapperClassName={inputWrapperClassname}
            />
          </div>
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "threshold",
                title: "Threshold",
                type: "text",
              }}
              wrapperClassName={inputWrapperClassname}
              inputContainerClassName={inputWrapperClassname}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
