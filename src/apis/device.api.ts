import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { Device_Params } from "src/types/device/device.params.type";
import { Device } from "src/types/device/device.type";
import http from "src/utils/http.util";

const url = "/devices";

const deviceApi = {
  // ! get
  listAllDevices(params: Device_Params) {
    return http.get<SuccessReponse<Device[]>>(`${url}/all`, { params });
  },

  getDeviceById(id: IDType, params: Device_Params) {
    return http.get<SuccessReponse<Device>>(`${url}/${id}`, { params });
  },
};

export default deviceApi;
