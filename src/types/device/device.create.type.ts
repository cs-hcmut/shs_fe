import { IDType } from "../_commons/id.type";
import { DeviceAttribute_Form } from "./device.attribute.type";

export interface Device_CreateBody {
  name: string;
  userId: IDType;
  attrs: DeviceAttribute_Form[];
}
