import { ScheduleModel } from "src/types/schedule/schedule.type";
import useHouseScheduleStores_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import useHouseScheduleStores_Condition from "../../_stores/useHouseSchedule_Conditions.store";
import useHouseScheduleStores_Actions from "../../_stores/useHouseSchedule_Actions.store";

interface useHouseSchedule_ItemProps {
  schedule: ScheduleModel;
}
export const useHouseSchedule_Item = ({
  schedule,
}: useHouseSchedule_ItemProps) => {
  const { time, repeat, DeviceAttributes, value } = schedule;

  const { setViewingScheduleDetail, setCurrentSchedule } =
    useHouseScheduleStores_ScheduleDetail();

  const { setRepeatFromString, setTimeValue } =
    useHouseScheduleStores_Condition();
  const { setDeviceAttributeList, setAction } =
    useHouseScheduleStores_Actions();

  // ! handle edit
  const onClickEdit = () => {
    setCurrentSchedule(schedule);

    setRepeatFromString(repeat);
    setTimeValue(time);
    setAction(value);
    setDeviceAttributeList(
      DeviceAttributes.map((ele) => {
        const deviceName = ele.device.room
          ? `${ele.device.name} - ${ele.device.room.name}`
          : ele.device.name;

        return {
          deviceName,
          deviceAttrId: ele.id,
        };
      })
    );

    setViewingScheduleDetail(true);
  };

  return { onClickEdit };
};
