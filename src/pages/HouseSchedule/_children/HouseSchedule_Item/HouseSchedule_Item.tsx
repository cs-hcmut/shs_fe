/* eslint-disable react-refresh/only-export-components */
import { Button } from "@mui/material";
import { HouseSchedule_Condition } from "src/types/schedule/schedule.condition.type";
import { ScheduleModel } from "src/types/schedule/schedule.type";
import useHouseScheduleStore_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import { HouseSchedule_DevicesForm } from "src/types/schedule/schedule.action.type";
import useHouseConfigStore_Condition from "src/pages/HouseRule/_stores/HouseRule_Conditions.store";
import useHouseScheduleStores_Condition from "../../_stores/useHouseSchedule_Conditions.store";
import useHouseScheduleStores_Actions from "../../_stores/useHouseSchedule_Actions.store";

interface HouseSchedule_ItemProps {
  schedule: ScheduleModel;
}

export default function HouseSchedule_Item({
  schedule,
}: HouseSchedule_ItemProps) {
  const { time, repeat, DeviceAttributes } = schedule;

  const { setViewingScheduleDetail, setCurrentSchedule } =
    useHouseScheduleStore_ScheduleDetail();

  const { setRepeat, setTimeValue } = useHouseScheduleStores_Condition();
  const { setDeviceAttributeList: setActionList } =
    useHouseScheduleStores_Actions();

  // ! handle edit
  const onClickEdit = () => {
    setCurrentSchedule(schedule);
    setViewingScheduleDetail(true);
  };

  return (
    <div className="rounded-lg bg-white overflow-hidden flex flex-col w-full gap-4 py-4 px-4 border border-border-primary relative">
      <div className="flex items-center absolute top-4 right-4">
        <Button
          onClick={onClickEdit}
          variant="outlined"
          className="!font-medium !text-black !normal-case !items-center !flex !rounded-md !py-1 !px-2"
        >
          Edit
        </Button>
      </div>

      <div className="flex flex-col gap-2 w-full ">
        <div className="flex flex-col gap-2">
          <Condition
            conditionItem={{
              repeat,
              time,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-2">
          {DeviceAttributes.map((ele) => {
            return (
              <ActionItem
                actionItem={{
                  deviceAttrId: ele.id,
                  value: ele.value,
                  deviceName: ele.device.name,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ConditionProps {
  conditionItem: HouseSchedule_Condition;
}
function Condition({ conditionItem }: ConditionProps) {
  const { time, repeat } = conditionItem;

  // Convert repeat string to readable format
  const getRepeatText = (repeatString: string): string => {
    // Check if the string has exactly 7 digits
    if (!/^[01]{7}$/.test(repeatString)) {
      return "Invalid repeat pattern";
    }

    // If all days are selected
    if (repeatString === "1111111") {
      return "each day";
    }

    // If weekdays only are selected (Mon-Fri)
    if (repeatString === "1111110") {
      return "weekdays";
    }

    // If weekends only are selected
    if (repeatString === "0000001") {
      return "weekends";
    }

    // Map days to their names
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const selectedDays = repeatString
      .split("")
      .map((digit, index) => (digit === "1" ? daysOfWeek[index] : null))
      .filter((day) => day !== null);

    // Handle special cases with better formatting
    if (selectedDays.length === 0) {
      return "never";
    } else if (selectedDays.length === 1) {
      return `on ${selectedDays[0]}`;
    } else if (selectedDays.length === 2) {
      return `on ${selectedDays.join(" and ")}`;
    } else {
      // Format multiple days with commas and "and"
      const lastDay = selectedDays.pop();
      return `on ${selectedDays.join(", ")} and ${lastDay}`;
    }
  };

  return (
    <p className="flex gap-1">
      <span>At</span>
      <span className="font-bold">{time}</span>
      <span>{getRepeatText(repeat)}</span>
    </p>
  );
}

interface ActionProps {
  actionItem: HouseSchedule_DevicesForm;
}
function ActionItem({ actionItem }: ActionProps) {
  const { deviceName, value } = actionItem;

  const actionMap: { [key: number]: string } = {
    1: "Turn on",
    0: "Turn off",
  };

  return (
    <p className="flex gap-1">
      <span className="font-semibold">{deviceName}</span>

      <span>will</span>
      <span className="text-primaryBlue italic">{actionMap[value]}</span>
    </p>
  );
}
