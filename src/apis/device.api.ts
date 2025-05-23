import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { Device_Params } from "src/types/device/device.params.type";
import { Device } from "src/types/device/device.type";
import { DeviceUpdateAttributeDto } from "src/types/device/device.update.type";
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

  // ! post
  uploadVoiceRecord(body: FormData) {
    return http.post<SuccessReponse<string>>(`${url}/voice-control`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 1000 * 60 * 1,
    });
  },

  // ! Update
  updateDeviceAttribute(dto: DeviceUpdateAttributeDto) {
    const { deviceId, attrId, body } = dto;
    return http.post<SuccessReponse<string>>(
      `${url}/${deviceId}/attribute/${attrId}/control`,
      body,
      {}
    );
  },
};

export default deviceApi;
