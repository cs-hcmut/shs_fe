import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomModal from "src/components/_common/CustomModal";
import { getIdFromNameId } from "src/utils/utils";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";
import HouseRule_Actions from "../HouseRule_Actions";
import useHouseConfigStore_Condition, {
  houseRuleStores_Condition_defaultCondition,
} from "../../_stores/HouseRule_Conditions.store";
import useHouseRuleStore_Actions, {
  HouseRuleStores_Actions_defaultAction,
} from "../../_stores/HouseRule_Actions.store";
import HouseRule_Condition from "../HouseRule_Condition";

interface HouseRule_RuleDetailProps {}

export default function HouseRule_RuleDetail({}: HouseRule_RuleDetailProps) {
  const { homeId: houseNameId } = useParams();
  const houseId = getIdFromNameId(houseNameId as string);
  const {
    setCurrentRule: setCurrentConfig,
    setViewingRuleDetail: setViewingConfigDetail,
    viewingRuleDetail: viewingConfigDetail,
  } = useHouseRuleStores_RuleDetail();

  const { setCondition } = useHouseConfigStore_Condition();
  const { setActionList } = useHouseRuleStore_Actions();

  const closeConfigDetail = () => {
    setViewingConfigDetail(false);
    setCurrentConfig(undefined);
    setCondition(houseRuleStores_Condition_defaultCondition);
    setActionList([HouseRuleStores_Actions_defaultAction]);
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
              <HouseRule_Condition />
            </div>
            <div className="col-span-1 lg:border-l border-border-primary pl-3 overflow-hidden h-full">
              <HouseRule_Actions />
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
