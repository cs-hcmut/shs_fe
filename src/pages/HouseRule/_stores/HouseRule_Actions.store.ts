import { IDType } from "src/types/_commons/id.type";
import { DeviceActionType, DeviceType } from "src/types/device/device.type";
import { Rule_ActionForm } from "src/types/rule/rule.create.type";
import { create } from "zustand";

export interface HouseRule_DeviceActionForm {
  roomId: IDType;
  deviceId: IDType;
  deviceType: DeviceType;
  action: DeviceActionType;
}

export interface IHouseRuleStores_Actions {
  actionList: Rule_ActionForm[];
  setActionList: (value: Rule_ActionForm[]) => void;
  addDeviceAction: () => void;
  removeDeviceAction: (actionIndex: number) => void;
}

export const HouseRuleStores_Actions_defaultAction: Rule_ActionForm = {
  deviceAttrId: "-1",
  value: 0,
};

const useHouseRuleStore_Actions = create<IHouseRuleStores_Actions>()((set) => ({
  actionList: [HouseRuleStores_Actions_defaultAction],
  setActionList: (value: Rule_ActionForm[]) => {
    set((state) => {
      state.actionList = value;
      return { ...state };
    });
  },
  addDeviceAction: () => {
    set((state) => {
      const newActionList = [
        ...state.actionList,
        HouseRuleStores_Actions_defaultAction,
      ];
      state.actionList = newActionList;
      return { ...state };
    });
  },
  removeDeviceAction: (actionIndex: number) => {
    set((state) => {
      const newActionList = state.actionList.filter(
        (_, index) => index !== actionIndex
      );
      state.actionList = newActionList;
      return { ...state };
    });
  },
}));

export default useHouseRuleStore_Actions;
