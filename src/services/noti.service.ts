import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useContext } from "react";
import notiApi from "src/apis/noti.api";
import { AppContext } from "src/contexts/app.context";
import { SuccessReponse } from "src/types/_commons/common.type";
import { NotificationParams } from "src/types/notification/notification.params.type";
import { NotificationModel } from "src/types/notification/notification.type";

export const NOTIFICATION_KEY = "notifications";

// ! create
const useCreateNoti = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notiApi.addNotification,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [NOTIFICATION_KEY],
      });
    },
  });
};

// ! get
const useListNotis = (
  params: NotificationParams,
  options?: Omit<
    UseQueryOptions<SuccessReponse<NotificationModel[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const { isAuthenticated } = useContext(AppContext);
  return useQuery<SuccessReponse<NotificationModel[]>, Error>({
    queryKey: [NOTIFICATION_KEY, params],
    queryFn: () => notiApi.listNotifications(params).then((res) => res.data),
    enabled: isAuthenticated,
    ...options,
  });
};

// ! update
const useUpdateNoti = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notiApi.updateNotification,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [NOTIFICATION_KEY],
      });
    },
  });
};

// ! delete
const useDeleteNoti = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notiApi.deleteNotification,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [NOTIFICATION_KEY],
      });
    },
  });
};

const NotiServices = {
  queries: { useListNotis },
  create: { useCreateNoti },
  update: { useUpdateNoti },
  delete: { useDeleteNoti },
};
export default NotiServices;
