import { Divider } from "@mui/material";
import CustomModal from "src/components/_common/CustomModal";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";
import HouseRule_Actions from "../HouseRule_Actions";
import useHouseConfigStore_Condition, {
  houseRuleStores_Condition_defaultCondition,
} from "../../_stores/HouseRule_Conditions.store";
import useHouseRuleStore_Actions, {
  HouseRuleStores_Actions_defaultAction,
} from "../../_stores/HouseRule_Actions.store";
import HouseRule_Condition from "../HouseRule_Condition";
import RuleServices from "src/services/rule.service";
import {
  Rule_ActionForm,
  Rule_ConditionForm,
} from "src/types/rule/rule.create.type";
import HouseRule_RuleDetail_Utils from "./HouseRule_RuleDetai.rule";
import {
  Rule_UpdateBody,
  Rule_UpdateDto,
} from "src/types/rule/rule.update.type";
import { toast } from "sonner";
import { get } from "lodash";

interface HouseRule_RuleDetailProps {}

export default function HouseRule_RuleDetail({}: HouseRule_RuleDetailProps) {
  // const { homeId: houseNameId } = useParams();
  // const houseId = getIdFromNameId(houseNameId as string);
  const {
    setCurrentRule,
    setViewingRuleDetail,
    viewingRuleDetail,
    currentRule,
  } = useHouseRuleStores_RuleDetail();

  const { setCondition, condition } = useHouseConfigStore_Condition();
  const { setActionList, actionList } = useHouseRuleStore_Actions();

  const closeConfigDetail = () => {
    setViewingRuleDetail(false);
    setCurrentRule(undefined);
    setCondition(houseRuleStores_Condition_defaultCondition);
    setActionList([HouseRuleStores_Actions_defaultAction]);
  };

  // ! handle update rule
  const currentActionList: Rule_ActionForm[] | undefined =
    currentRule?.actions.map((ele) => {
      return {
        deviceAttrId: ele.deviceAttrId,
        value: ele.value,
      };
    });
  const currentCondition: Rule_ConditionForm | undefined = currentRule
    ? {
        deviceAttrId: currentRule.deviceAttrId,
        compareType: currentRule.compareType,
        value: currentRule.value,
        deviceName: currentRule.deviceAttribute.device.name,
      }
    : undefined;
  const updateRuleMutation = RuleServices.update.useUpdateRule();

  const onUpdateRule = () => {
    if (!currentRule) {
      toast.error("No rule selected");
      return;
    }

    // Check if the action lists are the same
    const areActionsEqual = HouseRule_RuleDetail_Utils.areActionListsEqual(
      currentActionList,
      actionList
    );

    // Check if the conditions are the same
    const areConditionsEqual = HouseRule_RuleDetail_Utils.areConditionsEqual(
      currentCondition,
      condition
    );

    // If both are the same, return early from the function
    if (areActionsEqual && areConditionsEqual) {
      return;
    }
    const updateBody: Rule_UpdateBody = {
      ...(areConditionsEqual ? {} : condition),
      ...(areActionsEqual
        ? {}
        : {
            actions: actionList.map((ele) => {
              return {
                ...ele,
              };
            }),
          }),
    };

    const updateDto: Rule_UpdateDto = {
      body: updateBody,
      id: currentRule.id,
    };

    toast.promise(updateRuleMutation.mutateAsync(updateDto), {
      loading: "Updating",
      success: "Updated rule successfully",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: (err: any) => get(err, "message", "Cannot update rule"),
    });
  };

  return (
    <CustomModal
      isOpen={viewingRuleDetail}
      setIsOpen={setViewingRuleDetail}
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
            onClick={onUpdateRule}
            className="py-2 px-3 rounded-xl font-medium text-white bg-unhoveringBg hover:bg-hoveringBg"
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
