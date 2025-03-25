import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import scheduleApi from "src/apis/schedule.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { IDType } from "src/types/_commons/id.type";
import { ScheduleModel } from "src/types/schedule/schedule.type";

export const SCHEDULE_KEY = "schedules";

// ! create
const useCreateSchedule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: scheduleApi.createSchedule,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [SCHEDULE_KEY],
      });
    },
  });
};

// ! get
const useListSchedules = (
  options?: Omit<
    UseQueryOptions<SuccessReponse<ScheduleModel[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<ScheduleModel[]>, Error>({
    queryKey: [SCHEDULE_KEY],
    queryFn: () => scheduleApi.listAllSchedules().then((res) => res.data),
    ...options,
  });
};

const useGetScheduleById = (
  id: IDType,
  options?: Omit<
    UseQueryOptions<SuccessReponse<ScheduleModel>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<ScheduleModel>, Error>({
    queryKey: [SCHEDULE_KEY, id],
    queryFn: () => scheduleApi.getScheduleById(id).then((res) => res.data),
    ...options,
  });
};

// ! update
const useUpdateSchedule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: scheduleApi.updateSchedule,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [SCHEDULE_KEY],
      });
    },
  });
};

// ! delete
const useDeleteSchedule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: scheduleApi.deleteSchedule,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [SCHEDULE_KEY],
      });
    },
  });
};

const ScheduleServices = {
  queries: { useListSchedules, useGetScheduleById },
  create: { useCreateSchedule },
  update: { useUpdateSchedule },
  delete: { useDeleteSchedule },
};
export default ScheduleServices;
