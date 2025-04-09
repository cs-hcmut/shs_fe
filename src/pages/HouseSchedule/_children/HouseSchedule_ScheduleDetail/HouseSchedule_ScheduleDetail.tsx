import useHouseScheduleStores_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import CustomModal from "src/components/_common/CustomModal";
import { Divider } from "@mui/material";
import HouseSchedule_Conditions from "../HouseSchedule_Conditions";
import HouseSchedule_Actions from "../HouseSchedule_Actions";
import { useHouseSchedule_ScheduleDetail } from "./useHouseSchedule_ScheduleDetail.hook";

interface HouseSchedule_ScheduleDetailProps {}

export default function HouseSchedule_ScheduleDetail({}: HouseSchedule_ScheduleDetailProps) {
  const { setViewingScheduleDetail, viewingScheduleDetail } =
    useHouseScheduleStores_ScheduleDetail();

  const { onUpdateSchedule, closeScheduleDetail, onDeleteSchedule } =
    useHouseSchedule_ScheduleDetail();

  return (
    <CustomModal
      isOpen={viewingScheduleDetail}
      setIsOpen={setViewingScheduleDetail}
      onClose={closeScheduleDetail}
    >
      <div className="max-w-[80vw] h-[90vh] overflow-auto flex flex-col gap-4 justify-between">
        <div className="flex items-center justify-center gap-4">
          <p className="font-semibold text-xl text-center text-primaryBlue">
            Schedule Detail
          </p>
          <button
            type="button"
            onClick={onDeleteSchedule}
            className="bg-alert-red hover:bg-alertRed text-white font-medium py-1 px-2 rounded-md "
          >
            Delete schedule
          </button>
        </div>

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
