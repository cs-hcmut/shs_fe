/* eslint-disable react-refresh/only-export-components */
import { Button } from "@mui/material";
import { HouseSchedule_Condition } from "src/types/house-schedule/house-schedule.condition.type";
import { HouseScheduleModel } from "src/types/house-schedule/house-schedule.type";
import useHouseScheduleStore_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import { convertSecondsToHMS } from "src/utils/utils";
import { IDType } from "src/types/_commons/id.type";

interface HouseSchedule_ItemProps {
  schedule: HouseScheduleModel;
}

export default function HouseSchedule_Item({
  schedule,
}: HouseSchedule_ItemProps) {
  const { time, deviceAttrId, value } = schedule;

  const { setViewingScheduleDetail, setCurrentSchedule } =
    useHouseScheduleStore_ScheduleDetail();

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
              type: "time",
              interval: 0,
              time,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-2">
          <ActionItem deviceId={deviceAttrId} value={value} />
        </div>
      </div>
    </div>
  );
}

interface ConditionProps {
  conditionItem: HouseSchedule_Condition;
}
function Condition({ conditionItem }: ConditionProps) {
  const { type, time, interval } = conditionItem;

  const timeObj = convertSecondsToHMS(interval);
  const { hours, minutes, seconds } = timeObj;

  return type == "interval" ? (
    <p className="flex gap-1">
      <span>For every</span>
      {hours > 0 && (
        <>
          <span className="font-bold"> {hours}</span>
          <span className=""> hour </span>
        </>
      )}
      {minutes > 0 && (
        <>
          <span className="font-bold"> {minutes}</span>
          <span className=""> minute </span>
        </>
      )}
      {seconds > 0 && (
        <>
          <span className="font-bold"> {seconds}</span>
          <span className=""> second </span>
        </>
      )}
    </p>
  ) : (
    <p className="flex gap-1">
      <span>At</span>
      <span className="font-bold"> {time}</span>
      <span className=""> each day </span>
    </p>
  );
}

interface ActionProps {
  deviceId: IDType;
  value: number;
}
function ActionItem({ deviceId, value }: ActionProps) {
  const actionMap: { [key: number]: string } = {
    1: "Turn on",
    0: "Turn off",
  };

  return (
    <p className="flex gap-1">
      <span className="font-semibold">{deviceId}</span>

      <span>will</span>
      <span className="text-primaryBlue italic">{actionMap[value]}</span>
    </p>
  );
}
