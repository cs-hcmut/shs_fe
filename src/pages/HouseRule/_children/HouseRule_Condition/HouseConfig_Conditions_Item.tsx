import { useForm } from "react-hook-form";
import CustomFormInput from "src/components/_inputs/CustomFormInput";
import { InputOptionItem } from "src/components/_inputs/CustomFormInput/CustomFormInput";
import RuleServices from "src/services/rule.service";
import { Rule_ConditionForm } from "src/types/rule/rule.create.type";
import useHouseConfigStore_Condition from "../../_stores/HouseRule_Conditions.store";
import { Rule_CompareType } from "src/types/rule/rule.compareType.type";

interface HouseRule_Condition_ItemProps {
  defaultData?: Rule_ConditionForm;
}

export default function HouseRule_Condition_Item({
  defaultData,
}: HouseRule_Condition_ItemProps) {
  const { setCondition, condition } = useHouseConfigStore_Condition();

  const formMethods = useForm<Rule_ConditionForm>({
    defaultValues: defaultData ? defaultData : {},
  });

  const { control } = formMethods;

  // ! get publishers
  const { data: publisherData, isFetched } =
    RuleServices.queries.useGetPublishers();
  const publisherList = publisherData?.data || [];
  const publisherOptionList: InputOptionItem[] = publisherList.map((ele) => {
    return {
      name: ele.device.name,
      value: ele.id,
    };
  });

  // ! handle change value
  const onChangeAttrId = (value: string) => {
    setCondition({ ...condition, deviceAttrId: value });
  };
  const onChangeCompareType = (value: string) => {
    setCondition({ ...condition, compareType: value as Rule_CompareType });
  };
  const onChangeValue = (value: string) => {
    setCondition({ ...condition, value: Number(value) });
  };

  const inputWrapperClassname =
    "bg-white p-2 border text-sm border-border-secondary rounded-lg overflow-hidden truncate";

  return (
    <div className="w-full flex flex-col gap-2 p-2 rounded-lg bg-slate-100 border border-border-primary">
      <div className="w-full flex flex-col gap-2">
        {isFetched && (
          <CustomFormInput
            control={control}
            inputField={{
              name: "deviceAttrId",
              title: "Type",
              type: "options",
              valueOptions: publisherOptionList,
            }}
            wrapperClassName={inputWrapperClassname}
            onChange={onChangeAttrId}
          />
        )}
        <div className="grid grid-cols-2 gap-1">
          <div className="col-span-1">
            <CustomFormInput
              control={control}
              inputField={{
                name: "compareType",
                title: "Condition",
                type: "options",
                valueOptions: [
                  { name: ">", value: "gt" },
                  { name: ">=", value: "gte" },
                  { name: "<", value: "lt" },
                  { name: "<=", value: "lte" },
                  { name: "=", value: "e" },
                ],
              }}
              wrapperClassName={inputWrapperClassname}
              onChange={onChangeCompareType}
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
              onChange={onChangeValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
