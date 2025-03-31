import { IDType } from "../_commons/id.type";

export interface Device_Params
  extends Partial<{
    includeAttr: boolean;
    roomId: IDType;
  }> {}
