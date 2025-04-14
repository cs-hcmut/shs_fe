import useNotificationStores from "src/stores/Notification.store";

export const useNotificationSite = () => {
  const { notiList } = useNotificationStores();

  const unAckNotiCount = notiList.reduce(
    (count, noti) => (count + noti.status === "unack" ? 1 : 0),
    0
  );

  return { notiList, unAckNotiCount };
};
