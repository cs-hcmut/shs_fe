import { Divider, Switch } from "@mui/material";
import CustomModal from "src/components/_common/CustomModal";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";
import HouseRule_Actions from "../HouseRule_Actions";
import HouseRule_Condition from "../HouseRule_Condition";
import { useHouseRule_RuleDetail } from "./useHouseRule_RuleDetail.hook";
import MuiStyles from "src/styles";
import classNames from "classnames";

interface HouseRule_RuleDetailProps {}

export default function HouseRule_RuleDetail({}: HouseRule_RuleDetailProps) {
  // const { homeId: houseNameId } = useParams();
  // const houseId = getIdFromNameId(houseNameId as string);
  const {
    setViewingRuleDetail,
    viewingRuleDetail,
    setActivateRule,
    activateRule,
    receiveNoti,
    setReceiveNoti,
  } = useHouseRuleStores_RuleDetail();

  const { onClickSave, closeRuleDetail, onDeleteRule } =
    useHouseRule_RuleDetail();

  return (
    <CustomModal
      isOpen={viewingRuleDetail}
      setIsOpen={setViewingRuleDetail}
      onClose={closeRuleDetail}
    >
      <div className="max-w-[80vw] h-[90vh] overflow-auto flex flex-col gap-4 justify-between">
        <div className="flex w-full items-center justify-between gap-4">
          <p className="font-semibold text-xl text-center text-primaryBlue">
            Rule Detail
          </p>

          <div className="flex items-center justify-center gap-2 border px-2 rounded-lg  border-border-primary">
            <p className="font-semibold">Activate</p>
            <Switch
              sx={MuiStyles.switchStyles.green}
              checked={activateRule}
              onChange={(_, value) => {
                setActivateRule(value);
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 border px-2 rounded-lg  border-border-primary">
            <p className="font-semibold">Receive notification</p>
            <Switch
              sx={MuiStyles.switchStyles.green}
              checked={receiveNoti}
              onChange={(_, value) => {
                setReceiveNoti(value);
              }}
            />
          </div>

          <button
            type="button"
            onClick={onDeleteRule}
            className="bg-alert-red hover:bg-alertRed text-white font-medium py-1 px-2 rounded-md "
          >
            Delete rule
          </button>
        </div>

        <Divider className="!border-border-primary" />

        <div
          className={classNames("flex flex-grow overflow-hidden", {
            "opacity-60 pointer-events-none": !activateRule,
          })}
        >
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
            onClick={closeRuleDetail}
            className="py-2 px-3 rounded-xl border border-border-primary font-medium hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClickSave}
            className="py-2 px-3 rounded-xl font-medium text-white bg-unhoveringBg hover:bg-hoveringBg"
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
