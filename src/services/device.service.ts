import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import deviceApi from "src/apis/device.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { Device_Params } from "src/types/device/device.params.type";
import { Device } from "src/types/device/device.type";

export const DEVICE_KEY = "devices";

// ! get
const useListAllDevices = (
  options?: Omit<
    UseQueryOptions<SuccessReponse<Device[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<Device[]>, Error>({
    queryKey: [DEVICE_KEY],
    queryFn: () => deviceApi.listAllDevices().then((res) => res.data),
    ...options,
  });
};

const useGetDeviceById = (
  id: IDType,
  params: Device_Params,
  options?: Omit<
    UseQueryOptions<SuccessReponse<Device>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<Device>, Error>({
    queryKey: [DEVICE_KEY],
    queryFn: () => deviceApi.getDeviceById(id, params).then((res) => res.data),
    ...options,
  });
};

const RoomServices = {
  queries: { useListAllDevices, useGetDeviceById },
  create: {},
  update: {},
  delete: {},
};
export default RoomServices;
