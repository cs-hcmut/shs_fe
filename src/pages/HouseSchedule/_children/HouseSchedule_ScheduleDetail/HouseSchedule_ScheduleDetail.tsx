import useHouseScheduleStore_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import useHouseScheduleStores_Condition from "../../_stores/useHouseSchedule_Conditions.store";
import useHouseScheduleStores_Actions, {
  HouseScheduleStore_Actions_defaultAction,
} from "../../_stores/useHouseSchedule_Actions.store";
import CustomModal from "src/components/_common/CustomModal";
import { Divider } from "@mui/material";
import HouseSchedule_Conditions from "../HouseSchedule_Conditions";
import HouseSchedule_Actions from "../HouseSchedule_Actions";
import { toast } from "sonner";
import { Schedule_UpdateBody } from "src/types/schedule/schedule.update.type";
import ScheduleServices from "src/services/schedule.service";
import { get } from "lodash";

interface HouseSchedule_ScheduleDetailProps {}

export default function HouseSchedule_ScheduleDetail({}: HouseSchedule_ScheduleDetailProps) {
  const {
    currentSchedule,
    setCurrentSchedule,
    setViewingScheduleDetail,
    viewingScheduleDetail,
  } = useHouseScheduleStore_ScheduleDetail();

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
        loading: "Creating",
        success: "Created rule successfully",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (err: any) => get(err, "message", "Cannot create rule"),
      }
    );
  };

  return (
    <CustomModal
      isOpen={viewingScheduleDetail}
      setIsOpen={setViewingScheduleDetail}
      onClose={closeScheduleDetail}
    >
      <div className="max-w-[80vw] h-[90vh] overflow-auto flex flex-col gap-4 justify-between">
        <p className="font-semibold text-xl text-center text-primaryBlue">
          Schedule Detail
        </p>

        <Divider className="!border-border-primary" />

        <div className="flex flex-grow overflow-hidden">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
            <div className="col-span-1 pr-3 overflow-hidden h-full">
              <HouseSchedule_Conditions />
            </div>
            <div className="col-span-1 lg:border-l border-border-primary pl-3 overflow-hidden h-full">
              <HouseSchedule_Actions />
            </div>
          </div>
        </div>

        <Divider className="!border-border-primary" />

        <div className="w-full grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={closeScheduleDetail}
            className="py-2 px-3 rounded-xl border border-border-primary font-medium hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onUpdateSchedule}
            className="py-2 px-3 rounded-xl font-medium text-white bg-unhoveringBg hover:bg-hoveringBg"
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
