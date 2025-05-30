import { get } from "lodash";
import { toast } from "sonner";
import {
  Rule_PatchBody,
  Rule_UpdateBody,
  Rule_UpdateDto,
} from "src/types/rule/rule.update.type";
import HouseRule_RuleDetail_Utils from "./HouseRule_RuleDetai.rule";
import RuleServices from "src/services/rule.service";
import {
  Rule_ActionForm,
  Rule_ConditionForm,
} from "src/types/rule/rule.create.type";
import useHouseConfigStore_Condition, {
  houseRuleStores_Condition_defaultCondition,
} from "../../_stores/HouseRule_Conditions.store";
import useHouseRuleStore_Actions, {
  HouseRuleStores_Actions_defaultAction,
} from "../../_stores/HouseRule_Actions.store";
import useHouseRuleStores_RuleDetail from "../../_stores/HouseRule_RuleDetail.store";

export const useHouseRule_RuleDetail = () => {
  const {
    setCurrentRule,
    setViewingRuleDetail,
    currentRule,
    activateRule,
    receiveNoti,
  } = useHouseRuleStores_RuleDetail();

  const { setCondition, condition } = useHouseConfigStore_Condition();
  const { setActionList, actionList } = useHouseRuleStore_Actions();

  const closeRuleDetail = () => {
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
        key: currentRule.deviceAttribute.key,
      }
    : undefined;

  const updateRuleMutation = RuleServices.update.useUpdateRule();
  const patchRuleMutation = RuleServices.update.usePatchRule();

  const onClickSave = async () => {
    if (!currentRule) {
      toast.error("No rule selected");
      return;
    }

    // console.log(condition);
    // return;

    toast.promise(
      (async () => {
        // eslint-disable-next-line no-useless-catch
        try {
          // First call handleUpdateRule without its internal toast
          // Check if the action lists are the same
          const areActionsEqual =
            HouseRule_RuleDetail_Utils.areActionListsEqual(
              currentActionList,
              actionList
            );

          // Check if the conditions are the same
          const areConditionsEqual =
            HouseRule_RuleDetail_Utils.areConditionsEqual(
              currentCondition,
              condition
            );

          // If both are not the same, proceed with update
          if (!areActionsEqual || !areConditionsEqual) {
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

            await updateRuleMutation.mutateAsync(updateDto);
          }

          // Then call handlePatchRule without its internal toast
          // Only if activation state is different from current
          const patchBody: Rule_PatchBody = {};
          if (currentRule.isActive !== activateRule) {
            patchBody.isActive = activateRule;
          }

          if (currentRule.receiveNotification !== receiveNoti) {
            patchBody.receiveNotification = receiveNoti;
          }
          await patchRuleMutation.mutateAsync({
            id: currentRule.id,
            body: patchBody,
          });

          return "Success";
        } catch (error) {
          throw error;
        }
      })(),
      {
        loading: "Saving changes...",
        success: "Rule updated successfully",
        error: (err) => get(err, "message", "Failed to update rule"),
      }
    );
  };

  // ! handle delete rule
  const deleteRuleMutation = RuleServices.delete.useDeleteRule();
  const onDeleteRule = () => {
    if (!currentRule) {
      toast.error("No rule selected");
      return;
    }

    toast.promise(
      deleteRuleMutation.mutateAsync(currentRule.id, {
        onSuccess() {
          closeRuleDetail();
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

  return { closeRuleDetail, onClickSave, onDeleteRule };
};
