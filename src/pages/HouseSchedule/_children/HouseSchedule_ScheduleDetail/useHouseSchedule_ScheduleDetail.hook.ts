import { get } from "lodash";
import { toast } from "sonner";
import ScheduleServices from "src/services/schedule.service";
import { Schedule_UpdateBody } from "src/types/schedule/schedule.update.type";
import useHouseScheduleStores_Actions, {
  HouseScheduleStore_Actions_defaultAction,
} from "../../_stores/useHouseSchedule_Actions.store";
import useHouseScheduleStores_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import useHouseScheduleStores_Condition from "../../_stores/useHouseSchedule_Conditions.store";

export const useHouseSchedule_ScheduleDetail = () => {
  const { currentSchedule, setCurrentSchedule, setViewingScheduleDetail } =
    useHouseScheduleStores_ScheduleDetail();

  const { setRepeat, convertRepeatToString, timeValue } =
    useHouseScheduleStores_Condition();
  const { setDeviceAttributeList, action, setAction, deviceAttributeList } =
    useHouseScheduleStores_Actions();

  const closeScheduleDetail = () => {
    setViewingScheduleDetail(false);
    setCurrentSchedule(undefined);
    setRepeat(new Map());
    setAction(0);
    setDeviceAttributeList([HouseScheduleStore_Actions_defaultAction]);
  };

  // ! handle create schedule
  const updateScheduleMutation = ScheduleServices.update.useUpdateSchedule();
  const onUpdateSchedule = () => {
    if (!currentSchedule) {
      toast.error("No schedule selected");
      return;
    }

    const updateBody: Schedule_UpdateBody = {
      repeat: convertRepeatToString(),
      time: timeValue,
      deviceAttrIds: deviceAttributeList
        .map((ele) => {
          return ele.deviceAttrId === "-1" ? null : ele.deviceAttrId;
        })
        .filter((ele) => ele !== null),
      value: action,
    };

    // console.log(createBody);
    // return;

    toast.promise(
      updateScheduleMutation.mutateAsync(
        {
          id: currentSchedule.id,
          body: updateBody,
        },
        {
          onSuccess() {
            closeScheduleDetail();
          },
        }
      ),
      {
        loading: "Updating",
        success: "Updated schedule successfully",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (err: any) => get(err, "message", "Cannot update schedule"),
      }
    );
  };

  // ! handle delete
  const deleteScheduleMutation = ScheduleServices.delete.useDeleteSchedule();
  const onDeleteSchedule = () => {
    if (!currentSchedule) {
      toast.error("No schedule selected");
      return;
    }

    toast.promise(
      deleteScheduleMutation.mutateAsync(currentSchedule.id, {
        onSuccess() {
          closeScheduleDetail();
        },
      }),
      {
        loading: "Deleting",
        success: "Deleted schedule",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (err: any) => get(err, "message", "Cannot delete schedule"),
      }
    );
  };

  return { onUpdateSchedule, closeScheduleDetail, onDeleteSchedule };
};
