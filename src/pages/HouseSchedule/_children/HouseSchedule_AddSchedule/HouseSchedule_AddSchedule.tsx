import CustomModal from "src/components/_common/CustomModal";
import useHouseScheduleStores_Actions from "../../_stores/useHouseSchedule_Actions.store";
import useHouseScheduleStore_AddSchedule from "../../_stores/useHouseSchedule_AddSchedule.store";
import useHouseScheduleStores_Condition from "../../_stores/useHouseSchedule_Conditions.store";
import { Divider } from "@mui/material";
import HouseSchedule_Conditions from "../HouseSchedule_Conditions";
import HouseSchedule_Actions from "../HouseSchedule_Actions";
import ScheduleServices from "src/services/schedule.service";
import { Schedule_CreateBody } from "src/types/schedule/schedule.create.type";
import { toast } from "sonner";
import { get } from "lodash";

interface HouseSchedule_AddScheduleProps {}

export default function HouseSchedule_AddSchedule({}: HouseSchedule_AddScheduleProps) {
  const { resetTimeValue, clearRepeat, timeValue, convertRepeatToString } =
    useHouseScheduleStores_Condition();
  const {
    setDeviceAttributeList: setActionList,
    deviceAttributeList: actionList,
  } = useHouseScheduleStores_Actions();

  const { addingSchedule, setAddingSchedule } =
    useHouseScheduleStore_AddSchedule();

  const cancelAddingSchedule = () => {
    setAddingSchedule(false);
    resetTimeValue();
    setActionList([]);
    clearRepeat();
  };

  // ! handle create schedule
  const createScheduleMutation = ScheduleServices.create.useCreateSchedule();
  const onCreateSchedule = () => {
    const createBody: Schedule_CreateBody = {
      repeat: convertRepeatToString(),
      time: timeValue,
      deviceAttrIds: actionList.map((ele) => {
        return ele.deviceAttrId;
      }),
      value: 1,
    };

    // console.log(createBody);
    // return;

    toast.promise(
      createScheduleMutation.mutateAsync(createBody, {
        onSuccess() {
          cancelAddingSchedule();
        },
      }),
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
      isOpen={addingSchedule}
      setIsOpen={setAddingSchedule}
      onClose={cancelAddingSchedule}
    >
      <div className="max-w-[80vw] h-[90vh] overflow-auto flex flex-col gap-4 justify-between">
        <p className="font-semibold text-xl text-center text-primaryBlue">
          Add schedule
        </p>

        <Divider className="!border-border-primary" />

        <div className="flex flex-grow overflow-hidden">
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 h-full overflow-hidden">
            <div className="col-span-1 pr-3 overflow-hidden h-full">
              <HouseSchedule_Conditions />
            </div>
            <div className="col-span-1 lg:col-span-3 lg:border-l border-border-primary pl-3 overflow-hidden h-full">
              <HouseSchedule_Actions />
            </div>
          </div>
        </div>

        <Divider className="!border-border-primary" />

        <div className="w-full grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={cancelAddingSchedule}
            className="py-2 px-3 rounded-xl border border-border-primary font-medium hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreateSchedule}
            className="py-2 px-3 rounded-xl font-medium text-white bg-unhoveringBg hover:bg-hoveringBg"
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
