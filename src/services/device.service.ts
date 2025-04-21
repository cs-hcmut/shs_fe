import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import deviceApi from "src/apis/device.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { Device_Params } from "src/types/device/device.params.type";
import { Device } from "src/types/device/device.type";

export const DEVICE_KEY = "devices";

// ! get
const useListAllDevices = (
  params: Device_Params,
  options?: Omit<
    UseQueryOptions<SuccessReponse<Device[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<Device[]>, Error>({
    queryKey: [DEVICE_KEY, params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return deviceApi
        .listAllDevices({
          ...params,
        })
        .then((res) => res.data);
    },
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
    queryKey: [DEVICE_KEY, id, params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return deviceApi
        .getDeviceById(id, {
          ...params,
        })
        .then((res) => res.data);
    },
    ...options,
  });
};

const useUploadVoiceRecord = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deviceApi.uploadVoiceRecord,
    onSuccess: () => {
      setTimeout(() => {
        qc.invalidateQueries({
          queryKey: [DEVICE_KEY],
          refetchType: "all",
        });
      }, 200);
    },
  });
};

const useUpdateDeviceAttr = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deviceApi.updateDeviceAttribute,
    onSuccess: () => {
      // Delay the refetch to ensure the server has time to process
      qc.invalidateQueries({
        queryKey: [DEVICE_KEY],
      });
    },
  });
};

const DeviceServices = {
  queries: { useListAllDevices, useGetDeviceById },
  create: { useUploadVoiceRecord },
  update: { useUpdateDeviceAttr },
  delete: {},
};
export default DeviceServices;
