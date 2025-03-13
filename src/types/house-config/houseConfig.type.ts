import { IDType } from "../_commons/id.type";
import { HouseConfig_Action } from "./houseConfig.action.type";
import { HouseConfig_Condition } from "./houseConfig.condition.type";

export interface HouseConfigModel {
  id: IDType;
  name: string;
  conditions: HouseConfig_Condition[];
  actions: HouseConfig_Action[];
}
