import { create } from "zustand";

export interface INotificationSiteStore {
  showingNotificationModal: boolean;
  setShowingNotificationModal: (value: boolean) => void;
}

const useNotificationSiteStore = create<INotificationSiteStore>()((set) => ({
  showingNotificationModal: false,
  setShowingNotificationModal: (value: boolean) => {
    set((state) => {
      state.showingNotificationModal = value;
      return { ...state };
    });
  },
}));

export default useNotificationSiteStore;
