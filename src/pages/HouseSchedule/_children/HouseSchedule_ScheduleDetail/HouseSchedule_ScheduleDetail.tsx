import { useParams } from "react-router-dom";
import { getIdFromNameId } from "src/utils/utils";
import useHouseScheduleStore_ScheduleDetail from "../../_stores/useHouseSchedule_ScheduleDetail.store";
import useHouseScheduleStore_Conditions, {
  HouseScheduleStore_Condition_defaultCondition,
} from "../../_stores/useHouseSchedule_Conditions.store";
import useHouseScheduleStore_Actions, {
  HouseScheduleStore_Actions_defaultAction,
} from "../../_stores/useHouseSchedule_Actions.store";
import CustomModal from "src/components/_common/CustomModal";
import { Divider } from "@mui/material";
import HouseSchedule_Conditions from "../HouseSchedule_Conditions";
import HouseSchedule_Actions from "../HouseSchedule_Actions";

interface HouseSchedule_ScheduleDetailProps {}

export default function HouseSchedule_ScheduleDetail({}: HouseSchedule_ScheduleDetailProps) {
  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);
  const {
    setCurrentSchedule,
    setViewingScheduleDetail,
    viewingScheduleDetail,
  } = useHouseScheduleStore_ScheduleDetail();

  const { setConditionList } = useHouseScheduleStore_Conditions();
  const { setActionList } = useHouseScheduleStore_Actions();

  const closeScheduleDetail = () => {
    setViewingScheduleDetail(false);
    setCurrentSchedule(undefined);
    setConditionList([HouseScheduleStore_Condition_defaultCondition]);
    setActionList([HouseScheduleStore_Actions_defaultAction]);
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
            className="py-2 px-3 rounded-xl font-medium text-white bg-unhoveringBg hover:bg-hoveringBg"
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
