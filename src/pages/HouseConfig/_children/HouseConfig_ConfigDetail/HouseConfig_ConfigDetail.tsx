import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomModal from "src/components/_common/CustomModal";
import { getIdFromNameId } from "src/utils/utils";
import useHouseConfigStore_ConfigDetail from "../../_stores/HouseConfig_ConfigDetail.store";
import HouseConfig_Conditions from "../HouseConfig_Conditions";
import HouseConfig_Actions from "../HouseConfig_Actions";
import useHouseConfigStore_Conditions, {
  houseConfigStore_Condition_defaultCondition,
} from "../../_stores/HouseConfig_Conditions.store";
import useHouseConfigStore_Actions, {
  houseConfigStore_Actions_defaultAction,
} from "../../_stores/HouseConfig_Actions.store";

interface HouseConfig_ConfigDetailProps {}

export default function HouseConfig_ConfigDetail({}: HouseConfig_ConfigDetailProps) {
  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);
  const { setCurrentConfig, setViewingConfigDetail, viewingConfigDetail } =
    useHouseConfigStore_ConfigDetail();

  const { setConditionList } = useHouseConfigStore_Conditions();
  const { setActionList } = useHouseConfigStore_Actions();

  const closeConfigDetail = () => {
    setViewingConfigDetail(false);
    setCurrentConfig(undefined);
    setConditionList([houseConfigStore_Condition_defaultCondition]);
    setActionList([houseConfigStore_Actions_defaultAction]);
  };

  return (
    <CustomModal
      isOpen={viewingConfigDetail}
      setIsOpen={setViewingConfigDetail}
      onClose={closeConfigDetail}
    >
      <div className="max-w-[80vw] h-[90vh] overflow-auto flex flex-col gap-4 justify-between">
        <p className="font-semibold text-xl text-center text-primaryBlue">
          Config Detail
        </p>

        <Divider className="!border-border-primary" />

        <div className="flex flex-grow overflow-hidden">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
            <div className="col-span-1 pr-3 overflow-hidden h-full">
              <HouseConfig_Conditions />
            </div>
            <div className="col-span-1 lg:border-l border-border-primary pl-3 overflow-hidden h-full">
              <HouseConfig_Actions />
            </div>
          </div>
        </div>

        <Divider className="!border-border-primary" />

        <div className="w-full grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={closeConfigDetail}
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
