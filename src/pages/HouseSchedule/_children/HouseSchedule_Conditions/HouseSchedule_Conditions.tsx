import { HouseScheduleModel } from "src/types/house-schedule/house-schedule.type";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import useHouseScheduleStore_Conditions, {
  HouseSchedule_Condition_RepeatEnum,
} from "../../_stores/useHouseSchedule_Conditions.store";
import classNames from "classnames";

interface HouseSchedule_ConditionsProps {
  defaultData?: HouseScheduleModel;
}

export default function HouseSchedule_Conditions({
  defaultData,
}: HouseSchedule_ConditionsProps) {
  const { setTimeValue, timeValue, repeat, setRepeat } =
    useHouseScheduleStore_Conditions();

  const defaultTime = defaultData?.time;

  const currentTimeValue = defaultTime || timeValue;

  // ! on click repeat
  const onClickRepeat = (key: HouseSchedule_Condition_RepeatEnum) => () => {
    setRepeat(key);
  };

  // ! day map
  const dayMap: { [key in HouseSchedule_Condition_RepeatEnum]: string } = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col w-full gap-3">
        <p className="font-medium text-lg">Select time</p>
        <TimePicker
          ampm={false}
          className="!rounded-xl"
          value={dayjs()
            .set("hour", parseInt(currentTimeValue.split(":")[0]))
            .set("minute", parseInt(currentTimeValue.split(":")[1]))
            .set("second", parseInt(currentTimeValue.split(":")[2]))}
          onChange={(value) => {
            setTimeValue((value || dayjs()).format("HH:mm:ss"));
          }}
        />
      </div>

      <div className="flex flex-col w-full gap-3">
        <p className="font-medium text-lg">Repeat</p>
        <div className="flex w-full gap-2 flex-wrap">
          {Array(7)
            .fill(0)
            .map((_, index) => {
              const key = index as HouseSchedule_Condition_RepeatEnum;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={onClickRepeat(key)}
                  className={classNames(
                    "rounded-lg border border-border-secondary text-black py-1 px-1 text-sm",
                    {
                      "hover:bg-primaryBlue/60": !repeat.get(key),
                      "bg-primaryBlue": repeat.get(key),
                    }
                  )}
                >
                  {dayMap[key]}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
