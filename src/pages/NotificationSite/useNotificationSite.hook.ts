import NotiServices from "src/services/noti.service";

export const useNotificationSite = () => {
  // ! get notification
  const { data: notiData } = NotiServices.queries.useListNotis({});
  const notiList = notiData?.data || [];

  const unAckNotiCount = notiList.reduce(
    (count, noti) => (count + noti.status === "unack" ? 1 : 0),
    0
  );

  return { notiList, unAckNotiCount };
};
