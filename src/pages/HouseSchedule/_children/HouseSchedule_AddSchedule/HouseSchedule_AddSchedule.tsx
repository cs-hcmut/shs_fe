import CustomModal from "src/components/_common/CustomModal";
import useHouseScheduleStore_Actions from "../../_stores/useHouseSchedule_Actions.store";
import useHouseScheduleStore_AddSchedule from "../../_stores/useHouseSchedule_AddSchedule.store";
import useHouseScheduleStore_Conditions from "../../_stores/useHouseSchedule_Conditions.store";
import { Divider } from "@mui/material";
import HouseSchedule_Conditions from "../HouseSchedule_Conditions";
import HouseSchedule_Actions from "../HouseSchedule_Actions";

interface HouseSchedule_AddScheduleProps {}

export default function HouseSchedule_AddSchedule({}: HouseSchedule_AddScheduleProps) {
  const { resetTimeValue } = useHouseScheduleStore_Conditions();
  const { setActionList } = useHouseScheduleStore_Actions();

  const { addingSchedule, setAddingSchedule } =
    useHouseScheduleStore_AddSchedule();

  const cancelAddingSchedule = () => {
    setAddingSchedule(false);
    resetTimeValue();
    setActionList([]);
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
            className="py-2 px-3 rounded-xl font-medium text-white bg-unhoveringBg hover:bg-hoveringBg"
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
