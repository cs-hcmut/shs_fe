/* eslint-disable react-refresh/only-export-components */
import { Button } from "@mui/material";
import { DeviceActionType } from "src/types/device/device.type";
import { HouseConfig_Action } from "src/types/house-config/houseConfig.action.type";
import {
  HouseConfig_Condition,
  HouseConfig_Condition_ConditionType,
} from "src/types/house-config/houseConfig.condition.type";
import { HouseConfigModel } from "src/types/house-config/houseConfig.type";
import useHouseConfigStore_ConfigDetail from "../../_stores/HouseConfig_ConfigDetail.store";

interface HouseConfig_ConfigItemProps {
  config: HouseConfigModel;
}

export default function HouseConfig_ConfigItem({
  config,
}: HouseConfig_ConfigItemProps) {
  const { actions, conditions, name } = config;

  const { setViewingConfigDetail, setCurrentConfig } =
    useHouseConfigStore_ConfigDetail();

  const onClickEdit = () => {
    setCurrentConfig(config);
    setViewingConfigDetail(true);
  };

  return (
    <div className="rounded-lg bg-white overflow-hidden flex flex-col w-full gap-4 py-2 px-4 border border-border-primary">
      <div className="w-full flex items-center justify-between">
        <p className="font-semibold text-lg">{name}</p>
        <Button
          onClick={onClickEdit}
          variant="outlined"
          className="!font-medium !text-black !normal-case !items-center !flex !rounded-md"
        >
          Edit
        </Button>
      </div>

      <div className="flex flex-col gap-2 w-full ">
        <p className="font-medium text-left text-primaryColor">Conditions</p>
        <div className="flex flex-col gap-2">
          {conditions.map((cond, index) => {
            return <Condition key={index} conditionItem={cond} />;
          })}
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
  );
}

interface ConditionProps {
  conditionItem: HouseConfig_Condition;
}
function Condition({ conditionItem }: ConditionProps) {
  const { sensorName: deviceName, value, condition, threshold } = conditionItem;

  const conditionMap: { [key in HouseConfig_Condition_ConditionType]: string } =
    {
      "!=": "different from",
      "<": "less than",
      "<=": "less than or equal to",
      ">": "greater than",
      ">=": "greater than or equal to",
      "=": "equal to",
    };

  return (
    <p className="flex gap-1">
      <span>When</span>
      <span className="font-bold"> {deviceName}</span>
      <span className=""> have the </span>
      <span className="text-primaryBlue">{value}</span>
      <span className="text-utility-success-500 italic">
        {conditionMap[condition]}
      </span>
      <span className="text-primaryBlue font-semibold">{threshold}</span>
    </p>
  );
}

interface ActionProps {
  actionItem: HouseConfig_Action;
}
function ActionItem({ actionItem }: ActionProps) {
  const { device, room, action } = actionItem;

  const actionMap: { [key in DeviceActionType]: string } = {
    turn_on: "Turn on",
    turn_off: "Turn off",
  };

  return (
    <p className="flex gap-1">
      <span className="font-semibold">{device.name}</span>
      <span>at</span>
      <span className="font-semibold">{room.name}</span>
      <span>will</span>
      <span className="text-primaryBlue italic">{actionMap[action]}</span>
    </p>
  );
}
