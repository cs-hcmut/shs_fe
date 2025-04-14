import { NotificationModel } from "src/types/notification/notification.type";
import { create } from "zustand";

export interface INotificationStores {
  notiList: NotificationModel[];
  setNotiList: (value: NotificationModel[]) => void;
}

const useNotificationStores = create<INotificationStores>()((set) => ({
  notiList: [],
  setNotiList: (value: NotificationModel[]) => {
    set((state) => {
      state.notiList = value;
      return { ...state };
    });
  },
}));

export default useNotificationStores;
