/* eslint-disable react-refresh/only-export-components */
import { Button } from "@mui/material";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";
import { RuleModel } from "src/types/rule/rule.type";
import { Rule_Condition } from "src/types/rule/rule.condition.type";
import { Rule_CompareType } from "src/types/rule/rule.compareType.type";
import { Rule_Action } from "src/types/rule/rule.action.type";
import useHouseConfigStore_Condition from "../../_stores/HouseRule_Conditions.store";
import useHouseRuleStore_Actions from "../../_stores/HouseRule_Actions.store";
import classNames from "classnames";

interface HouseRule_RuleItemProps {
  rule: RuleModel;
}

export default function HouseRule_RuleItem({ rule }: HouseRule_RuleItemProps) {
  const {
    actions,
    compareType,
    value,
    deviceAttribute,
    deviceAttrId,
    isActive,
    receiveNotification,
  } = rule;
  const conditionItem: Rule_Condition = {
    deviceAttribute,
    compareType,
    value,
  };

  const {
    setViewingRuleDetail,
    setCurrentRule,
    setActivateRule,
    setReceiveNoti,
  } = useHouseRuleStores_RuleDetail();

  const { setCondition } = useHouseConfigStore_Condition();
  const { setActionList } = useHouseRuleStore_Actions();

  const onClickEdit = () => {
    setCurrentRule(rule);
    setCondition({
      deviceAttrId,
      compareType,
      value,
      deviceName: deviceAttribute.device.name,
      key: deviceAttribute.key,
    });
    setActionList(
      actions.map((act) => {
        return {
          deviceAttrId: act.deviceAttrId,
          value: act.value,
        };
      })
    );
    setActivateRule(isActive);
    setReceiveNoti(receiveNotification);
    setViewingRuleDetail(true);
  };

  return (
    <div
      className={classNames(
        "rounded-lg bg-white overflow-hidden flex flex-col w-full gap-4 py-2 px-4 border border-border-primary"
      )}
    >
      <div className="w-full flex items-center justify-between">
        {/* <p className="font-semibold text-lg">{name}</p> */}
        <Button
          onClick={onClickEdit}
          variant="outlined"
          className="!font-medium !text-black !normal-case !items-center !flex !rounded-md opacity-100"
        >
          Edit
        </Button>
      </div>

      <div
        className={classNames("w-full", {
          "opacity-60": !rule.isActive,
        })}
      >
        <div className="flex flex-col gap-2 w-full ">
          <p className="font-medium text-left text-primaryColor">Conditions</p>
          <div className="flex flex-col gap-2">
            <Condition conditionItem={conditionItem} />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium text-left text-primaryColor">Actions</p>
          <div className="flex flex-col gap-2">
            {actions.map((action, index) => {
              return <ActionItem key={index} actionItem={action} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ConditionProps {
  conditionItem: Rule_Condition;
}
function Condition({ conditionItem }: ConditionProps) {
  const { deviceAttribute, compareType, value } = conditionItem;
  const { device } = deviceAttribute;

  const compareTypeMap: { [key in Rule_CompareType]: string } = {
    lt: "less than",
    lte: "less than or equal to",
    gt: "greater than",
    gte: "greater than or equal to",
    eq: "equal to",
  };

  return (
    <p className="flex gap-1">
      <span>When</span>
      <span className="font-bold"> {device?.name}</span>
      <span className=""> detects the value </span>
      {/* <span className="text-primaryBlue">{value}</span> */}
      <span className="text-utility-success-500 italic">
        {compareTypeMap[compareType]}
      </span>
      <span className="text-primaryBlue font-semibold">{value}</span>
    </p>
  );
}

interface ActionProps {
  actionItem: Rule_Action;
}
function ActionItem({ actionItem }: ActionProps) {
  const { deviceAttribute, value } = actionItem;
  const { device } = deviceAttribute;

  const actionMap: { [key: number]: string } = {
    1: "Turn on",
    0: "Turn off",
  };

  return (
    <p className="flex gap-1">
      <span className="font-semibold">{device.name}</span>
      {/* <span>at</span>
      <span className="font-semibold">{room.name}</span> */}
      <span>will</span>
      <span className="text-primaryBlue italic">{actionMap[value]}</span>
    </p>
  );
}
