import { HouseConfig_Condition } from "src/types/house-config/houseConfig.condition.type";
import { create } from "zustand";

export interface IHouseConfigStore_Conditions {
  conditionList: HouseConfig_Condition[];
  setConditionList: (value: HouseConfig_Condition[]) => void;
}

export const houseConfigStore_Condition_defaultCondition: HouseConfig_Condition =
  {
    sensorId: "-1",
    sensorName: "Sensor device",
    sensorType: "temperature_sensor",
    condition: "=",
    value: "temperature",
    threshold: "0",
  };

const useHouseConfigStore_Conditions = create<IHouseConfigStore_Conditions>()(
  (set) => ({
    conditionList: [houseConfigStore_Condition_defaultCondition],
    setConditionList: (value: HouseConfig_Condition[]) => {
      set((state) => {
        state.conditionList = value;
        return { ...state };
      });
    },
  })
);

export default useHouseConfigStore_Conditions;
