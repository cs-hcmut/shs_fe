export type HouseSchedule_ConditionType = "time" | "interval";

export interface HouseSchedule_Condition {
  type: HouseSchedule_ConditionType;
  time: string;
  interval: number;
}
