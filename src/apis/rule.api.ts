import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { DeviceAttribute } from "src/types/device/device.attribute.type";
import { Rule_CreateBody } from "src/types/rule/rule.create.type";
import { RuleModel } from "src/types/rule/rule.type";
import { Rule_UpdateDto } from "src/types/rule/rule.update.type";

import http from "src/utils/http.util";

const url = "/system-rules";

const ruleApi = {
  // ! post
  createRule(body: Rule_CreateBody) {
    return http.post<SuccessReponse<RuleModel>>(`${url}`, body);
  },

  // ! get
  listAllRules() {
    return http.get<SuccessReponse<RuleModel[]>>(`${url}/all`);
  },

  getPublishers() {
    return http.get<SuccessReponse<DeviceAttribute[]>>(`${url}/publishers`);
  },

  getSubscribers() {
    return http.get<SuccessReponse<DeviceAttribute[]>>(`${url}/subscribers`);
  },

  // ! put
  updateRule(dto: Rule_UpdateDto) {
    const { body, id } = dto;
    return http.put<SuccessReponse<RuleModel>>(`${url}/${id}`, body);
  },

  // ! delete
  deleteRule(id: IDType) {
    return http.delete<SuccessReponse<string>>(`${url}/${id}`);
  },
};

export default ruleApi;
