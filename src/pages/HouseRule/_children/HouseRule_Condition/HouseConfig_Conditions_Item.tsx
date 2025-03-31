import { useForm } from "react-hook-form";
import CustomFormInput from "src/components/_inputs/CustomFormInput";
import { Rule_ConditionForm } from "src/types/rule/rule.create.type";

interface HouseRule_Condition_ItemProps {
  defaultData?: Rule_ConditionForm;
}

export default function HouseRule_Condition_Item({
  defaultData,
}: HouseRule_Condition_ItemProps) {
  const formMethods = useForm<Rule_ConditionForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  const inputWrapperClassname =
    "bg-white p-2 border text-sm border-border-secondary rounded-lg overflow-hidden truncate";

  return (
    <div className="w-full flex flex-col gap-2 p-2 rounded-lg bg-slate-100 border border-border-primary">
      <div className="w-full flex flex-col gap-2">
        <CustomFormInput
          control={control}
          inputField={{
            name: "deviceAttrId",
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
        <div className="grid grid-cols-2 gap-1">
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "compareType",
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
                name: "value",
                title: "Value",
                type: "number",
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
