import {
  Rule_ActionForm,
  Rule_ConditionForm,
} from "src/types/rule/rule.create.type";

// Helper function to compare action lists
const areActionListsEqual = (
  list1: Rule_ActionForm[] | undefined,
  list2: Rule_ActionForm[] | undefined
): boolean => {
  // If both are undefined or empty, they're equal
  if (!list1 && !list2) return true;
  if (!list1 || !list2) return false;
  if (list1.length !== list2.length) return false;

  // Compare each action in the lists
  return list1.every((action1, index) => {
    const action2 = list2[index];
    return (
      action1.deviceAttrId === action2.deviceAttrId &&
      action1.value === action2.value
    );
  });
};

// Helper function to compare conditions
const areConditionsEqual = (
  condition1: Rule_ConditionForm | undefined,
  condition2: Rule_ConditionForm | undefined
): boolean => {
  // If both are undefined, they're equal
  if (!condition1 && !condition2) return true;
  if (!condition1 || !condition2) return false;

  // Compare all properties of the conditions
  return (
    condition1.deviceAttrId === condition2.deviceAttrId &&
    condition1.compareType === condition2.compareType &&
    condition1.value === condition2.value &&
    condition1.deviceName === condition2.deviceName
  );
};

const HouseRule_RuleDetail_Utils = {
  areActionListsEqual,
  areConditionsEqual,
};

export default HouseRule_RuleDetail_Utils;
